import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import AuthContext from "../context/AuthContext";
import { Download, AlertCircle } from "lucide-react";

const TemplateDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/api/templates/${id}`
                );
                setTemplate(data);
            } catch (err) {
                setError("Could not load template details.");
            } finally {
                setLoading(false);
            }
        };
        fetchTemplate();
    }, [id]);

    const handleDownload = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        setDownloading(true);
        try {
            const { data } = await axios.get(
                `http://localhost:5000/api/templates/${id}/download`
            );

            // Determine content to save
            const content = typeof data.codeContent === 'object'
                ? JSON.stringify(data.codeContent, null, 2)
                : data.codeContent;

            const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
            saveAs(blob, `${template.title.replace(/\s+/g, "_")}_source.json`);
        } catch (err) {
            setError("Download failed. Please try again.");
        } finally {
            setDownloading(false);
        }
    };

    if (loading) return <div className="p-8 text-center bg-slate-50 min-h-screen">Loading...</div>;
    if (!template) return <div className="p-8 text-center bg-slate-50 min-h-screen">Template not found</div>;

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-4rem)] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="md:flex">
                        <div className="md:w-2/3 bg-slate-100 p-8 flex items-center justify-center">
                            <img
                                src={template.thumbnailImage}
                                alt={template.title}
                                className="max-h-[500px] w-auto rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                            />
                        </div>
                        <div className="md:w-1/3 p-8 flex flex-col">
                            <div className="flex-1">
                                <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide mb-4">
                                    {template.category}
                                </span>
                                <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
                                    {template.title}
                                </h1>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {template.description}
                                </p>

                                {error && (
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <AlertCircle className="h-5 w-5 text-red-500" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-red-700">{error}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={handleDownload}
                                    disabled={downloading}
                                    className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <Download className={`mr-2 h-6 w-6 ${downloading ? 'animate-bounce' : ''}`} />
                                    {downloading ? "Downloading..." : "Download Source"}
                                </button>
                                <p className="mt-4 text-center text-sm text-slate-500">
                                    {user
                                        ? "Download ready!"
                                        : "Please login to download this template."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateDetails;
