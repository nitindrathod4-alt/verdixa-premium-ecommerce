import {NextResponse} from "next/server";
import {getSupabaseServer} from "@/lib/supabase/server";
import {isAdminRequest} from "@/lib/admin";

const BUCKET="brand-assets";
const FILE="grandparents.jpg";

export async function POST(request:Request){
  if(!isAdminRequest(request)) return NextResponse.json({error:"Unauthorized"},{status:401});
  const supabase=getSupabaseServer();
  if(!supabase) return NextResponse.json({error:"Supabase server is not configured."},{status:500});

  const form=await request.formData();
  const file=form.get("file");
  if(!(file instanceof File)) return NextResponse.json({error:"Please select an image."},{status:400});
  if(!file.type.startsWith("image/")) return NextResponse.json({error:"Only image files are allowed."},{status:400});
  if(file.size>5*1024*1024) return NextResponse.json({error:"Image must be 5 MB or smaller."},{status:400});

  const {data:buckets}=await supabase.storage.listBuckets();
  if(!buckets?.some(b=>b.name===BUCKET)){
    const {error}=await supabase.storage.createBucket(BUCKET,{public:true});
    if(error && !/already exists/i.test(error.message)) return NextResponse.json({error:error.message},{status:500});
  }

  const bytes=Buffer.from(await file.arrayBuffer());
  const {error}=await supabase.storage.from(BUCKET).upload(FILE,bytes,{contentType:file.type,upsert:true,cacheControl:"3600"});
  if(error) return NextResponse.json({error:error.message},{status:500});

  const {data}=supabase.storage.from(BUCKET).getPublicUrl(FILE);
  return NextResponse.json({success:true,url:data.publicUrl});
}

export async function GET(request:Request){
  if(!isAdminRequest(request)) return NextResponse.json({error:"Unauthorized"},{status:401});
  const supabase=getSupabaseServer();
  if(!supabase) return NextResponse.json({url:null});
  const {data}=supabase.storage.from(BUCKET).getPublicUrl(FILE);
  return NextResponse.json({url:data.publicUrl});
}
