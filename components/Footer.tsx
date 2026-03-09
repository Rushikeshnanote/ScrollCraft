export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-white/5 pt-16 pb-8 px-6 md:px-12 text-gray-400">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                {/* Brand */}
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-white">Future Fresh</span>
                    </div>
                    <p className="text-sm leading-relaxed">
                        The future of freshness. Premium cold-pressed, zero-preservative fruit blends.
                    </p>
                </div>

                {/* Shop Links */}
                <div className="md:col-span-1">
                    <h4 className="text-white font-semibold mb-4">Shop</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Subscriptions</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Merchandise</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div className="md:col-span-1">
                    <h4 className="text-white font-semibold mb-4">Support</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Shipping Returns</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Wholesale</a></li>
                    </ul>
                </div>

                {/* Newsletter Signup */}
                <div className="md:col-span-1">
                    <h4 className="text-white font-semibold mb-4">Stay Fresh</h4>
                    <p className="text-sm mb-4">Subscribe for exclusive updates and 10% off your first order.</p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full bg-white/5 border border-white/10 rounded-l-md px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md text-sm font-semibold transition-colors"
                        >
                            Join
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/50">
                <p>© {new Date().getFullYear()} Future Fresh Inc. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
