import TopTabs from "@/components/TopTabs";

export default async function Performance() {
  const tabs = [
    { label: "Compressing", content: <p>这里是个人信息</p> },
    { label: "Reducing", content: <p>这里是账号设置</p> },
    { label: "Caching", content: <p>这里是账号设置</p> },
    { label: "Rendering", content: <p>这里是账号设置</p> },
    { label: "Monitoring", content: <p>这里是安全中心</p> },
  ];

  return (
    <div className="h-full p-4 bg-slate-100">
      <div className="h-60 flex flex-col items-center justify-center">
        <h1 className="font-serif font-bold text-6xl text-green-400">Performance</h1>
        <h6 className="font-mono text-sm text-green-600 mt-2">resources downloading | page parsing</h6>
      </div>
      <TopTabs tabs={tabs} />
    </div>
  );
}
