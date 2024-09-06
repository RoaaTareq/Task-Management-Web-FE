import React from "react";
import Card from "../../../Components/Cards/Card"; 

const handleEdit = () => {
    console.log("Edit clicked");
};

const handleDelete = () => {
    console.log("Delete clicked");
};

const ViewList = () => {
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
                        <Card title="Task Title" content="This is the content of the card." projectName="Project A" onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                    
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
                        <Card title="Task Title" content="This is the content of the card." projectName="Project A" onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
                        <Card title="Task Title" content="This is the content of the card." projectName="Project A" onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
                        <Card title="Task Title" content="This is the content of the card." projectName="Project A" onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
                        <Card title="Task Title" content="This is the content of the card." projectName="Project A" onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                    
                    

                </div>
            </div>
        </section>
    );
};

export default ViewList;
