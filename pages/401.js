// import node module libraries
import { Fragment } from "react";
import { Col, Row, Image } from "react-bootstrap";
import Link from "next/link";

// import blank layout, header and footer to override default layout
import NotFound from "layouts/NotFound";
import { Bold } from "react-feather";

const Error401 = () => {
  return (
    <Fragment>
      <Row>
        <Col sm={12}>
          <div className="text-center">
            <div className="mb-3">
              <Image
                src="/images/error/401-error.jpg"
                alt=""
                className="img-fluid"
              />
            </div>
            {/* <h1 className="display-4 fw-bold">Oops! You dont have permission for this page.</h1> */}
            <p className="mb-4" style={{fontSize: 20, fontWeight: 'Bold', color:'purple'}}>
            Oops! You dont have permission for this page.
            </p>
            <Link href="/admin/dashboard" className="btn btn-primary">
              Go Home
            </Link>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

Error401.Layout = NotFound;

export default Error401;
