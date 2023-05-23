export function Wrapper({children}){
    return (
      <div className='mx-auto w-[90%] md:w-[85%] max-w-[1200px]'>
        {children}
      </div>
    )
}