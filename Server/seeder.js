const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Template = require('./models/Template');
const connectDB = require('./config/db');

dotenv.config();

const mockTemplates = [
    {
        title: 'Admin Dashboard Pro',
        description: 'A comprehensive admin dashboard with analytics, user management, and settings pages. Built with React and Tailwind CSS.',
        category: 'Admin',
        thumbnailImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        codeContent: {
            "App.js": "import React from 'react';\nfunction App() {\n  return <h1>Admin Dashboard</h1>;\n}\nexport default App;",
            "Sidebar.js": "export const Sidebar = () => <div>Sidebar</div>;"
        }
    },
    {
        title: 'E-commerce Analytics',
        description: 'Track sales, revenue, and customer growth with this beautiful e-commerce analytics template. Features chart integration.',
        category: 'Analytics',
        thumbnailImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        codeContent: "console.log('E-commerce Analytics Code');"
    },
    {
        title: 'SaaS Landing Page',
        description: 'High-converting landing page template for SaaS products. Includes pricing tables, testimonials, and feature sections.',
        category: 'Landing Page',
        thumbnailImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        codeContent: "<h1>SaaS Landing Page</h1>"
    }
];

const importData = async () => {
    try {
        await connectDB();

        await Template.deleteMany();

        await Template.insertMany(mockTemplates);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
