import { Github, Twitter, Linkedin, Zap } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#020617] border-t border-cyan-500/10 py-16">
            <div className="max-w-6xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 text-xl font-bold text-cyan-400 mb-6">
                            <Zap size={20} fill="currentColor" />
                            <span>FLASH SALE</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                            Experience the future of real-time commerce with our Space-Based Architecture. 
                            Lightning fast, infinitely scalable, and built for the modern web.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-semibold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Infrastructure</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Data Grid</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Real-time Stats</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-cyan-500/5 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                                <Github size={20} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-cyan-500/5 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-cyan-500/5 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-600">
                    <p>© 2026 Flash Sale SBA. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
