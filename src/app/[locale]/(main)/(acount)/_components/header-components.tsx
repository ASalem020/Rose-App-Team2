export default function HeaderComponent({title,}: {title: string}) {
  return (
    <div className=" p-5">
      <h1 className="font-extrabold mb-3 text-4xl text-zinc-800 tracking-wider">
        {title}
       </h1>
    </div>
  );
}
