import { Rings } from 'react-loader-spinner';

type Props = {
  message?: string;
};

const LoaderOverlay = ({ message }: Props) => {
  return (
    <div className="overlay">
      <Rings
        height="80"
        width="80"
        color="rgb(55, 0, 60)"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
      <div>{message}</div>
    </div>
  );
};

export default LoaderOverlay;
