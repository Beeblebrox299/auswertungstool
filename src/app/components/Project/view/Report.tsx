import {Document, Page, Image, Text} from "@react-pdf/renderer";

const renderReport = () => {

}

const ReportForm: React.FC = () => {
    return (
        <div className="displayBlock">
            <form>
                <div className="info border">
                    <h2>Titel des Berichts: </h2>
                    <input type="text" id="title" defaultValue={"Titel"}></input>
                </div><br/>
                <div className="info border">
                    <h2>Einleitung: </h2>
                    <textarea cols={50} rows={8}/>
                </div>
            </form>
        </div>
    )
};

export default ReportForm;