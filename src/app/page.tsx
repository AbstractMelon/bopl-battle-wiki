"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBug,
    faEdit,
    faSearch,
    faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

interface Page {
    title: string;
    link: string;
    description: string;
}

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({
    onSearch,
}) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        onSearch(query);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
            />
            <button>Search</button>
        </div>
    );
};

const Home: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPages, setFilteredPages] = useState<Page[]>([]);
    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await fetch("/data/pages.json");
                const data: Page[] = await response.json();
                setPages(data);
                setFilteredPages(data);
            } catch (error) {
                console.error("Error fetching pages data:", error);
            }
        };
        fetchPages();
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = pages.filter((page) =>
            page.title.toLowerCase().includes(query.toLowerCase()),
        );
        setFilteredPages(filtered);
    };

    return (
        <div>
            <div className="container">
                <header className="header">
                    <h1>Welcome to the Bopl Battle Wiki</h1>
                </header>
                <br />
                <br />
                <div>
                    <h1>Overview</h1>
                    <p>
                        Bopl Battle is a couch/online platform fighter game
                        focused around battling your friends and combining
                        unique and wild abilities together. There are many
                        choices such as a{" "}
                        <a href="Abilities#Shrink Ray">Shrink Ray</a>, creating{" "}
                        <a href="Abilities#Black Hole">Black Holes</a>,{" "}
                        <a href="Abilities#Time Stop">stopping time</a>, and
                        attaching a <a href="Abilities#Engine">rocket engine</a>{" "}
                        to the stage to send it flying. With just under twenty
                        thousand unique combinations, you will never run out of
                        ways to kill your friends (and yourself) within this
                        game. (If you feel creative, or, rather, the opposite,
                        visit <a href="Combos">Combos</a> to create or read
                        combos). The whole game is built around the synergy of
                        different combos of abilities and the usage of
                        surroundings and the <a href="Maps">map</a>. The game
                        gets another layer of depth when playing in teams and
                        combining combos with your teammates.
                    </p>
                </div>
                <SearchBar onSearch={handleSearch} />
                <br />
                <main>
                    <section className="grid-container">
                        {filteredPages.map((page, index) => (
                            <a
                                key={index}
                                href={page.link}
                                className="page-link"
                            >
                                <h2>{page.title}</h2>
                                <p>{page.description}</p>
                            </a>
                        ))}
                    </section>
                </main>
            </div>
            <div className="footer">
                <div className="footer-icons">
                    <a
                        href="https://github.com/AbstractMelon/bopl-battle-wiki/wiki"
                        className="footer-icon-link"
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="footer-icon"
                        />
                    </a>
                    <a
                        href="https://github.com/AbstractMelon/bopl-battle-wiki/issues"
                        className="footer-icon-link"
                    >
                        <FontAwesomeIcon icon={faBug} className="footer-icon" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
