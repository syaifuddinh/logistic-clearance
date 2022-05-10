import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  title?: string;
  description?: string;
  imageName?: string;
}

export default function RegularCard(props) {

    return (
        <>
            <div className="text-muted">NPWP / Tax ID</div>
            <div>
                <span className="d-inline-block mr-3">
                    111 222 333
                </span>
                <span>
                    <Button variant="link">Edit</Button>
                </span>
            </div>
        </>
    );
}
