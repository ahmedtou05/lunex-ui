import fs from "fs"
import path from "path"

const registry = JSON.parse(
  fs.readFileSync("./registry.json", "utf-8")
)

for (const component of registry.components) {
  for (const file of component.files) {
    const filePath = path.join("./", file.path)
    if (fs.existsSync(filePath)) {
      file.content = fs.readFileSync(filePath, "utf-8")
    }
  }
}

fs.writeFileSync(
  "./registry.built.json",
  JSON.stringify(registry, null, 2)
)

console.log("Registry built successfully")