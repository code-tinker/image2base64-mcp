# MCP Tools - 图片转Base64服务器

一个基于 Model Context Protocol (MCP) 的图片转Base64服务器，专为AI助手设计，让AI能够"看到"和处理图片。

## 🌟 功能特性

- 🖼️ **图片转Base64**: 将本地图片或远程图片URL转换为Base64格式
- 🌐 **支持远程URL**: 自动下载并处理网络图片
- 📋 **多格式支持**: 支持PNG、JPEG、GIF、WebP、SVG等多种图片格式
- ⚡ **高性能处理**: 使用Sharp库进行高效图片处理和优化
- 🔗 **MCP协议**: 标准化的AI工具接口，与AI助手无缝集成
- 🎯 **自动优化**: 智能转换为JPEG格式以减小文件大小

## 📦 安装和运行

### 1. 克隆项目并安装依赖

```bash
git clone <repository-url>
cd mcp-tools
npm install
```

### 2. 编译TypeScript代码

```bash
npm run build
```

### 3. 启动MCP服务器

```bash
npm start
```

### 4. 运行测试

```bash
npm test
```

## 🚀 使用方法

### 作为MCP工具使用

本服务器实现了MCP协议，提供一个核心工具：

#### `image_to_base64`

将图片转换为Base64格式，让AI助手能够查看和分析图片内容。

**参数:**
- `image_path` (string): 图片路径或URL
  - 支持本地文件路径: `/path/to/image.jpg`
  - 支持远程URL: `https://example.com/image.png`

**返回:**
- 图片的Base64编码数据和MIME类型

### 配置MCP客户端

#### 在Cursor中使用

在Cursor的MCP配置文件中添加：

```json
{
  "mcpServers": {
    "image-to-base64": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/path/to/mcp-tools"
    }
  }
}
```

#### 通过编程方式使用

```javascript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

// 调用图片转Base64工具
const result = await client.request({
  method: "tools/call",
  params: {
    name: "image_to_base64",
    arguments: {
      image_path: "/path/to/your/image.jpg"
    }
  }
});
```

## 📁 项目结构

```
mcp-tools/
├── src/
│   ├── index.ts          # MCP服务器主文件
│   └── test-client.ts    # 完整的测试客户端
├── dist/                 # 编译后的JavaScript文件
├── package.json          # 项目配置和依赖
├── tsconfig.json         # TypeScript编译配置
└── README.md            # 项目说明文档
```

## 🛠️ 技术栈

- **TypeScript**: 类型安全的JavaScript开发
- **@modelcontextprotocol/sdk**: MCP协议官方SDK
- **Sharp**: 高性能Node.js图片处理库
- **Axios**: 可靠的HTTP客户端，用于远程图片下载
- **Node.js**: JavaScript运行时环境

## 📝 开发脚本

| 命令 | 说明 |
|------|------|
| `npm run build` | 编译TypeScript代码到dist目录 |
| `npm start` | 启动MCP服务器 |
| `npm run dev` | 编译并启动服务器（开发模式） |
| `npm test` | 运行完整的功能测试 |

## 🔧 使用示例

### 本地图片处理

```bash
# 通过测试客户端处理本地图片
npm test
```

测试客户端会自动：
1. 创建一个SVG测试图片
2. 将其转换为Base64格式
3. 测试远程图片URL处理
4. 清理临时文件

### 远程图片处理

服务器自动处理远程图片URL，包括：
- HTTP/HTTPS图片链接
- 自动下载和缓存
- 格式转换和优化

## ⚠️ 注意事项

1. **网络连接**: 处理远程图片需要稳定的网络连接
2. **文件权限**: 确保对本地图片文件有读取权限
3. **内存使用**: 大图片会占用更多内存，建议适当调整Node.js堆大小
4. **格式支持**: 输出统一为JPEG格式以优化性能和兼容性
5. **MCP协议**: 服务器使用stdio协议运行，适合与MCP客户端集成

## 🤝 支持的图片格式

| 输入格式 | 支持状态 | 输出格式 |
|----------|----------|----------|
| JPEG | ✅ | JPEG |
| PNG | ✅ | JPEG |
| GIF | ✅ | JPEG |
| WebP | ✅ | JPEG |
| SVG | ✅ | JPEG |
| TIFF | ✅ | JPEG |

## 📄 许可证

ISC License

---

**为什么需要这个工具？**

AI助手通常无法直接处理图片文件，需要将图片转换为Base64格式才能"看到"图片内容。这个MCP服务器提供了标准化的图片处理接口，让AI助手能够轻松处理各种图片任务。
