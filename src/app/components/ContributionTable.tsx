import { useContribution } from "../Contexts";

const ContributionTable: React.FC = () => {
    const { contributionArray } = useContribution();
    const contributionKeys = Array.from(new Set(contributionArray.flatMap(Object.keys)));

    return(
        <div>
            <h2>Beiträge</h2>
            {contributionArray.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {contributionKeys.map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                            {contributionArray.map((contribution, index) => (
                                <tr key={index}>
                                    {contributionKeys.map((key) => (
                                        <td key={key}>
                                            {contribution[key] !== undefined ? contribution[key] : 'N/A'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                </table>
            ) : (   
                <p>Keine Beiträge vorhanden.</p>
            )}
        </div>
    );
}

export default ContributionTable;