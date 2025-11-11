// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
//       <img width={160} src={assets.logo} alt="" />
//       <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @GreatStack.dev | All right reserved.</p>
//       <div className='flex gap-2.5'>
//         <img width={38} src={assets.facebook_icon} alt="" />
//         <img width={38} src={assets.twitter_icon} alt="" />
//         <img width={38} src={assets.instagram_icon} alt="" />
//       </div>
//     </div>
//   )
// }

// export default Footer




import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20">
      {/* Replaced logo */}
      <h1
        onClick={() => (window.location.href = "/")}
        className="cursor-pointer text-2xl font-bold tracking-wide select-none"
      >
        <span className="text-blue-600">H</span>ive
        <span className="text-blue-600">H</span>ive
      </h1>

      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright @HireHive | All right reserved.
      </p>

      <div className="flex gap-2.5">
        <img width={38} src={assets.facebook_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
        <img width={38} src={assets.instagram_icon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
