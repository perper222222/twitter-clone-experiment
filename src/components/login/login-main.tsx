export function LoginMain(): JSX.Element {
  const { signInWithNumber } = useAuth();

  return (
    <main className='grid lg:grid-cols-[1fr,45vw]'>
      <div className='relative hidden items-center justify-center lg:flex'>
        <NextImage
          imgClassName='object-cover'
          blurClassName='bg-accent-blue'
          src='/assets/twitter-banner.png'
          alt='Twitter banner'
          layout='fill'
          useSkeleton
        />
        <i className='absolute'>
          <CustomIcon className='h-96 w-96 text-white' iconName='TwitterIcon' />
        </i>
      </div>

      <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start lg:justify-center'>
        <i className='mb-0 self-center lg:mb-10 lg:self-auto'>
          <CustomIcon
            className='-mt-4 h-6 w-6 text-accent-blue lg:h-12 lg:w-12 dark:lg:text-twitter-icon'
            iconName='TwitterIcon'
          />
        </i>

        <div className='flex max-w-xs flex-col gap-4 font-twitter-chirp-extended lg:max-w-none lg:gap-16'>
          <h1 className='text-3xl before:content-["See_what’s_happening_in_the_world_right_now."] lg:text-6xl lg:before:content-["Happening_now"]' />
          <h2 className='hidden text-xl lg:block lg:text-3xl'>
            Join Twitter today.
          </h2>
        </div>

        <div className='flex max-w-xs flex-col gap-6 [&_button]:py-2'>
          <div className='grid gap-3 font-bold'>
            {/* 已移除 Google / Apple 登录按钮 */}
            <div className='grid w-full grid-cols-[1fr,auto,1fr] items-center gap-2'>
              <i className='border-b border-light-border dark:border-dark-border' />
              <p>or</p>
              <i className='border-b border-light-border dark:border-dark-border' />
            </div>
            <Button
              className='cursor-not-allowed bg-accent-blue text-white transition hover:brightness-90
                         focus-visible:!ring-accent-blue/80 focus-visible:brightness-90 active:brightness-75'
            >
              Sign up with phone or email
            </Button>
          </div>

          <div className='flex flex-col gap-3'>
            <p className='font-bold'>Already have an account? </p>
            <div className='flex gap-2 items-center'>
              <input
                id="participantId"
                type="number"
                min={1}
                max={200}
                placeholder="Enter ID 1-200"
                className="px-3 py-2 border rounded w-40 text-sm"
              />
              <Button
                className='border border-light-line-reply font-bold text-accent-blue hover:bg-accent-blue/10
                           focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80 active:bg-accent-blue/20
                           dark:border-light-secondary'
                onClick={() => {
                  const el = document.getElementById('participantId') as HTMLInputElement | null;
                  const val = el?.value ? Number(el.value) : NaN;
                  signInWithNumber(val);
                }}
              >
                Enter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
