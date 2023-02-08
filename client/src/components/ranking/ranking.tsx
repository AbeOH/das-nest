export default function Ranking() {
    return (
        <section>
            <h1 style={{ fontSize: "32px", textAlign: "center" }}>Ranking</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "49%", textAlign: "center" }}>
                    <h2 style={{ fontSize: "24px" }}>Group Ranking</h2>
                    <img
                        src="/RankingGroups.png"
                        alt="ranking"
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
                <div style={{ width: "49%", textAlign: "center" }}>
                    <h2 style={{ fontSize: "24px" }}>Parent Ranking</h2>
                    <img
                        src="RankingParents.png"
                        alt="ranking"
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            </div>
        </section>
    );
}
