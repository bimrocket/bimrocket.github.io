import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function(eleventyConfig)
{
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addGlobalData("year", new Date().getFullYear());

  const translations = {};

  const i18nDir = path.join(__dirname, "src/_data/i18n");
  for (const file of fs.readdirSync(i18nDir))
  {
    if (file.endsWith(".json"))
    {
      const lang = path.basename(file, ".json");
      const jsonPath = path.join(i18nDir, file);
      translations[lang] = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    }
  }

  eleventyConfig.addNunjucksGlobal("t", function(key)
  {
    const lang = this.ctx.language || "en";
    return translations[lang]?.[key] || key;
  });
};
