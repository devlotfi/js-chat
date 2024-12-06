import ErrorSVG from '../assets/svg/error.svg';

export default function ErrorIndicator() {
  return (
    <div className="flex flex-col items-center space-y-5">
      <img className="h-[7rem]" src={ErrorSVG} alt="error" />
      <div className="flex text-[17pt]">An error occured</div>
    </div>
  );
}
