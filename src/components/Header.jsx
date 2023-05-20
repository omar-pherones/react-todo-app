import { DiReact } from 'react-icons/di';

const Header = () => {
    return (
        <header className="header container mx-auto bg-gray-900 rounded-tl-lg rounded-tr-lg p-10 border-dashed border-teal-900 border-b">
            <div className="logo flex items-center gap-3">
                <span className="text-teal-500 text-3xl">
                    <DiReact />
                </span>
                <h2 className="uppercase font-semibold text-teal-500 text-xl tracking-wider">
                    React Todo App
                </h2>
            </div>
        </header>
    );
};

export default Header;
