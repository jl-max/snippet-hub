import TopTabs from "@/components/TopTabs";

export default async function FramworkReact() {
  const tabs = [
    { label: "Component", content: <p>这里是个人信息</p> },
    { label: "Data flow", content: <p>这里是账号设置</p> },
    { label: "State management", content: <p>这里是安全中心</p> },
    { label: "React Router", content: <p>这里是安全中心</p> },
    { label: "CSS", content: <p>这里是安全中心</p> },
    { label: "Optimization", content: <p>这里是安全中心</p> },
  ];

  return (
    <div className="h-full p-4 bg-slate-100">
      <div className="h-60 flex items-center justify-center">
        <h1 className="font-serif font-bold text-6xl text-blue-400">React</h1>
      </div>
      <TopTabs tabs={tabs} />
    </div>
  );
}
