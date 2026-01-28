import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/templates");
                setTemplates(data);
            } catch (error) {
                console.error("Error fetching templates:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTemplates();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Premium Dashboard Templates
                </h1>
                <p className="mt-5 max-w-xl mx-auto text-xl text-slate-500">
                    Kickstart your next project with our professionally designed, fully
                    responsive React dashboard templates.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template) => (
                    <div
                        key={template._id}
                        className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200"
                    >
                        <div className="h-48 overflow-hidden bg-slate-100 relative">
                            <img
                                src={template.thumbnailImage}
                                alt={template.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-indigo-600 shadow-sm">
                                {template.category}
                            </div>
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                    {template.title}
                                </h3>
                                <p className="text-slate-600 line-clamp-3">
                                    {template.description}
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <Link
                                    to={`/template/${template._id}`}
                                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                                >
                                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
