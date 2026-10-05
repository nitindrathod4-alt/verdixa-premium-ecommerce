import type {MetadataRoute} from "next";
export default function manifest():MetadataRoute.Manifest{
 return {name:"Verdixa",short_name:"Verdixa",description:"Premium botanical wellness, made a daily ritual.",start_url:"/",display:"standalone",background_color:"#f5f1e8",theme_color:"#536b58",icons:[]};
}