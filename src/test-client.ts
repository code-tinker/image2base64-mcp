#!/usr/bin/env node

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import {
  CallToolResultSchema,
  ListToolsResultSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";

class TestClient {
  private client: Client;

  constructor() {
    this.client = new Client(
      {
        name: "test-client",
        version: "1.0.0",
      },
      {
        capabilities: {},
      }
    );
  }

  async connect() {
    const transport = new StdioClientTransport({
      command: "node",
      args: ["dist/index.js"],
    });

    await this.client.connect(transport);
    console.log("✅ 客户端已连接到MCP服务器");
  }

  async testListTools() {
    console.log("\n🔍 测试列出可用工具...");
    try {
      const result = await this.client.request(
        { method: "tools/list" },
        ListToolsResultSchema
      );

      console.log("📋 可用工具:");
      result.tools.forEach((tool, index) => {
        console.log(`  ${index + 1}. ${tool.name}: ${tool.description}`);
      });
      return result.tools;
    } catch (error) {
      console.error("❌ 列出工具失败:", error);
      throw error;
    }
  }

  async testImageToBase64(imagePath: string) {
    console.log(`\n🖼️  测试图片转Base64: ${imagePath}`);
    try {
      const result = await this.client.request(
        {
          method: "tools/call",
          params: {
            name: "image_to_base64",
            arguments: {
              image_path: imagePath,
            },
          },
        },
        CallToolResultSchema
      );

      console.log("✅ 转换成功!");
      if (result.content && result.content.length > 0) {
        const content = result.content[0];
        if (content.type === "text") {
          const text = content.text;
          // 只显示base64的前100个字符以节省空间
          if (text.includes("Base64数据:")) {
            const base64Start = text.indexOf("Base64数据:") + "Base64数据:".length;
            const base64Data = text.substring(base64Start).trim();
            const preview = base64Data.substring(0, 100) + "...";
            console.log(`📝 结果预览: ${text.split("Base64数据:")[0]}Base64数据: ${preview}`);
            console.log(`📏 Base64数据长度: ${base64Data.length} 字符`);
          } else {
            console.log(`📝 结果: ${text}`);
          }
        }
      }
      return result;
    } catch (error) {
      console.error("❌ 转换失败:", error);
      throw error;
    }
  }

  async createTestImage() {
    console.log("\n🎨 创建测试图片...");
    
    // 创建一个简单的SVG测试图片
    const svgContent = `
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#4CAF50"/>
  <circle cx="100" cy="100" r="80" fill="#FFF"/>
  <text x="100" y="110" text-anchor="middle" fill="#4CAF50" font-size="20" font-family="Arial">测试图片</text>
</svg>`.trim();

    const testImagePath = path.join(process.cwd(), "test-image.svg");
    fs.writeFileSync(testImagePath, svgContent);
    console.log(`✅ 测试图片已创建: ${testImagePath}`);
    return testImagePath;
  }

  async runTests() {
    try {
      console.log("🚀 开始MCP服务器测试...\n");

      // 连接到服务器
      await this.connect();

      // 测试列出工具
      await this.testListTools();

      // 创建测试图片
      const testImagePath = await this.createTestImage();

      // 测试本地图片转换
      await this.testImageToBase64(testImagePath);

      // 测试远程图片转换
      console.log("\n🌐 测试远程图片转换...");
      const remoteImageUrl = "https://via.placeholder.com/150x150.png?text=Test";
      await this.testImageToBase64(remoteImageUrl);

      // 清理测试文件
      if (fs.existsSync(testImagePath)) {
        fs.unlinkSync(testImagePath);
        console.log("\n🧹 测试文件已清理");
      }

      console.log("\n🎉 所有测试通过!");

    } catch (error) {
      console.error("\n💥 测试失败:", error);
      process.exit(1);
    } finally {
      // 关闭客户端连接
      await this.client.close();
      console.log("\n👋 客户端连接已关闭");
    }
  }
}

// 运行测试
const testClient = new TestClient();
testClient.runTests().catch(console.error); 