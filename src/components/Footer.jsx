const Footer = () => {
    return (
        <footer className="container mx-auto bg-gray-900 p-10 border-t border-teal-900 border-dashed">
            <p className="text-sm text-center text-teal-500 ">
                © {new Date().getFullYear()} React Todo App. All rights
                reserved.
            </p>
        </footer>
    );
};

export default Footer;
