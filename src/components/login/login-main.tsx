export function LoginMain(): JSX.Element {
  const handleLogin = () => {
    const el = document.getElementById('participantId') as HTMLInputElement | null;
    const val = el?.value ? Number(el.value) : NaN;
    if (val >= 1 && val <= 200) {
      window.location.href = `/home?id=${val}`; // 直接跳转到模拟主页
    } else {
      alert('请输入 1-200 的编号');
    }
  };

  return (
    <main className='grid lg:grid-cols-[1fr,45vw]'>
      {/* ... 你的其他布局 ... */}
      <div className='flex gap-2 items-center'>
        <input
          id="participantId"
          type="number"
          min={1}
          max={200}
          placeholder="Enter ID 1-200"
          className="px-3 py-2 border rounded w-40 text-sm"
        />
        <button
          className='border border-light-line-reply font-bold text-accent-blue hover:bg-accent-blue/10'
          onClick={handleLogin}
        >
          Enter
        </button>
      </div>
    </main>
  );
}
