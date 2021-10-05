import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(){
    //get filenames
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName=>{
      const id = fileName.replace(/\.md$/, ""); // removes the md extention

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      //use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      //Combine the data with the id
      return {
          id,
          ...matterResult.data
      }
    })

    //sorting all the Data by date
    return allPostsData.sort(({date: a}, {date: b})=>{
        if (a<b){
            return 1
        } else if (a > b){
            return -1;
        } else {
            return 0
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map(fileName=>{
        return {
            params:{
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
};

export async function getPostData(id){
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
     contentHtml,
    ...matterResult.data,
  };
}