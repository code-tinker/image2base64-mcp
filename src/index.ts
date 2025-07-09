#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import axios from "axios";
import sharp from "sharp";

// 图片转base64工具函数
async function imageToBase64(imagePath: string): Promise<{ base64: string; mimeType: string }> {
  try {
    let imageBuffer: Buffer;
    
    // 判断是否为URL
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      // 远程URL
      const response = await axios.get(imagePath, {
        responseType: 'arraybuffer'
      });
      imageBuffer = Buffer.from(response.data);
    } else {
      // 本地路径
      if (!fs.existsSync(imagePath)) {
        throw new Error(`文件不存在: ${imagePath}`);
      }
      imageBuffer = fs.readFileSync(imagePath);
    }

    // 使用sharp处理图片并转换为base64
    const processedBuffer = await sharp(imageBuffer)
      .jpeg({ quality: 90 }) // 转换为JPEG格式以减小体积
      .toBuffer();

    // 获取图片的MIME类型
    const metadata = await sharp(imageBuffer).metadata();
    const mimeType = metadata.format === 'png' ? 'image/png' : 
                    metadata.format === 'gif' ? 'image/gif' :
                    metadata.format === 'webp' ? 'image/webp' : 'image/jpeg';

    // 转换为base64
    const base64 = processedBuffer.toString('base64');
    return { base64, mimeType };
  } catch (error) {
    throw new Error(`图片处理失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

class ImageToBase64Server {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "image-to-base64-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "image_to_base64",
            description: "将图片地址转为base64然后AI才可以真正看到这张图片。支持本地文件路径和远程URL。",
            inputSchema: {
              type: "object",
              properties: {
                image_path: {
                  type: "string",
                  description: "图片路径，可以是本地文件路径或远程URL",
                },
              },
              required: ["image_path"],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name !== "image_to_base64") {
        throw new Error(`未知的工具: ${request.params.name}`);
      }

      const args = request.params.arguments as any;
      if (!args.image_path) {
        throw new Error("缺少必需的参数: image_path");
      }

      try {
        const { base64, mimeType } = await imageToBase64(args.image_path);
        
        return {
          content: [
            {
              type: "image",
              data: base64,
              mimeType: mimeType,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `转换失败: ${error instanceof Error ? error.message : '未知错误'}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Image to Base64 MCP Server 已启动");
  }
}

// 启动服务器
const server = new ImageToBase64Server();
server.run().catch(console.error); 
