const fs = require("fs");

var fileList = [];

// 获取当前位置下的所有文件名
async function getFiles() {
  const dir = await fs.opendirSync("./");
  for await (const dirent of dir) {
    const [, sub] = dirent.name.split(".");
    if (!sub) {
      fileList.push(dirent);
    }
  }
}

// 生成markdown目录
async function writeFile() {
  const content = fileList.map((item) => `- ${item.name}`).join("\n");

  await fs.writeFileSync(
    "README.md",
    `# 目录生成命令\nnode start.js\n\n## fantastic-JavaScript\npopo的奇思妙想JavaScript\n\n${content}`
  );
}

async function init() {
  try {
    console.log("生成markdown目录中...");
    await getFiles();
    await writeFile();
    console.log("生成markdown目录成功！");
  } catch (err) {
    console.log("出错啦...", err);
  }
}

init();
