export default function Hero() {
    return (
        <div className={"min-h-screen flex flex-col mx-auto mt-64"}>
            <h1 className="text-center text-6xl font-display font-bold text-text-primary">MADDOX H.</h1>
            <h2 className="text-center text-2xl font-display font-bold text-text-secondary opacity-75">Full-Stack Developer</h2>

            <div className={"mx-auto border-2 border-border mt-12 px-4 py-2 rounded-3xl"}>
                <p className="text-md font-sans font-bold text-text-secondary opacity-90 mt-2">Building fast web apps, open-source tools, and games.</p>
                <p className="text-md font-sans font-bold text-text-secondary opacity-90 my-2">- Bachelor's CS & Master's CS (in progress)</p>
            </div>

            <div className={"flex flex-row mt-16 mx-auto space-x-7"}>
                <button className={"bg-accent-primary px-6 py-4 rounded-2xl border-2 border-border-accent text-text-primary font-mono"}>View My Work</button>
                <button className={"bg-bg-secondary px-6 py-4 rounded-2xl border-2 border-border text-text-primary font-mono"}>Github</button>
            </div>
        </div>
    )
}