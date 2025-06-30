# mcp-tools



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://git.frontnode.net/zhongzhi/mcp-tools.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://git.frontnode.net/zhongzhi/mcp-tools/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.

# MCP Image to Base64 Server

这是一个基于Model Context Protocol (MCP)的图片转Base64服务器，可以将本地图片文件或远程图片URL转换为Base64格式。

## 功能特性

- 🖼️ 支持本地图片文件转换
- 🌐 支持远程图片URL转换
- 📋 支持多种图片格式（PNG, JPEG, GIF, WebP, SVG等）
- 🔗 使用stdio协议与MCP客户端通信
- ⚡ 使用Sharp库进行高效图片处理

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 编译TypeScript代码

```bash
npm run build
```

### 3. 运行服务器

```bash
npm start
```

### 4. 运行测试

```bash
npm test
```

## 使用方法

### 作为MCP Server使用

这个服务器实现了MCP协议，可以通过MCP客户端使用。服务器提供一个工具：

- **image_to_base64**: 将图片转换为Base64格式

#### 工具参数

```json
{
  "image_path": "图片路径或URL"
}
```

#### 示例

```javascript
// 通过MCP客户端调用
const result = await client.request({
  method: "tools/call",
  params: {
    name: "image_to_base64",
    arguments: {
      image_path: "/path/to/image.jpg"  // 或 "https://example.com/image.jpg"
    }
  }
});
```

### 配置MCP客户端

如果你使用支持MCP的客户端（如Cursor），可以在mcpservers.json中添加：

```json
{
  "mcpServers": {
    "image-to-base64": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/path/to/this/project"
    }
  }
}
```

## 项目结构

```
mcp-tools/
├── src/
│   ├── index.ts          # MCP服务器主文件
│   └── test-client.ts    # 测试客户端
├── dist/                 # 编译后的JavaScript文件
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript配置
└── README.md            # 说明文档
```

## 技术栈

- **TypeScript**: 主要开发语言
- **@modelcontextprotocol/sdk**: MCP协议SDK
- **Sharp**: 高性能图片处理库
- **Axios**: HTTP客户端用于远程图片下载
- **Node.js**: 运行环境

## 开发脚本

- `npm run build`: 编译TypeScript代码
- `npm start`: 启动MCP服务器
- `npm run dev`: 编译并启动服务器
- `npm test`: 运行测试客户端

## 注意事项

1. 服务器使用stdio协议运行，适合与MCP客户端集成
2. 远程图片需要网络连接，请确保网络畅通
3. 图片会被处理为JPEG格式以优化大小
4. 支持的图片格式取决于Sharp库的支持

## 许可证

ISC License
