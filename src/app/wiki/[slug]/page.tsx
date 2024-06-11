import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";
import { getWikiPage } from "../../../lib/github";

interface WikiPageProps {
    params: { slug: string };
}

async function WikiPage({ params }: WikiPageProps) {
    const { slug } = params;
    const markdown = await getWikiPage(slug);

    const { data, content } = matter(markdown);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return (
        <div>
            <div className="container">
                    <div className="header">
                        <h1>Bopl Wiki!</h1>
                        <nav className="navbar">
                            <ul>
                                <li><a href="/home">Home</a></li>
                                <li><a href="/pages">All pages</a></li>
                                <li><a href="/articles">Report Bug</a></li>
                                <li><a href="/about">Edit</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            <div className="container mx-auto p-5">
                {/*
                <header className="headerbar text-center bg-primary border-solid border-secondary border-4 py-5 rounded-lg mx-auto mb-10 max-w-lg transform translate-y-8">
                    <h1 className="font-main text-white text-6xl">{data.title}</h1>
                </header>
                */}
                <div className="content text-center">
                    <div className="markdown-body">
                        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WikiPage;
