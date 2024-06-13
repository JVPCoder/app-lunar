import '../../assets/styles/output.css';

type BannerTextProps = {
    content: string;
};

export const BannerText = ({content}: BannerTextProps) => {

    return(
        <div className="flex justify-center">
            <p className="font-raleway drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white font-semibold text-2xl">{content}</p>
        </div>
    );
};
