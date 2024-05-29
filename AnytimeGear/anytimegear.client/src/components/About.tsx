function About() {
    return (
        <div className="container about-us-page">
            <div className="title">
                <h1 className="title">About AnytimeGear</h1>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card p-3 shadow border-top border-2 rounded h-100">
                        <div className="card-body">
                            <h2 className="card-title">Introduction</h2>
                            <p className="card-text">
                                At AnytimeGear, we're passionate about making sporting activities accessible to everyone, anytime, anywhere. Our mission is to provide a seamless renting experience for sporting equipment, empowering individuals to pursue their adventures without limitations.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card p-3 shadow border-top border-2 rounded h-100">
                        <div className="card-body">
                            <h2 className="card-title">Our History</h2>
                            <p className="card-text">
                                Founded in [Year], AnytimeGear started with a simple idea: to bridge the gap between sports enthusiasts and the gear they need. Over the years, we've grown into a trusted platform, serving customers nationwide with top-quality equipment for a wide range of activities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card p-3 shadow border-top border-2 rounded h-100">
                        <div className="card-body">
                            <h2 className="card-title">Our Values</h2>
                            <p className="card-text">
                                Accessibility: We believe that everyone should have the opportunity to experience the joy of sports, regardless of their background or expertise.<br />
                                Quality: We're committed to providing high-quality equipment that meets the diverse needs of our customers, ensuring safety and performance.<br />
                                Innovation: We continuously strive to innovate and improve our services, staying ahead of the curve in the ever-evolving sports industry.<br />
                                Customer Satisfaction: Your satisfaction is our priority. We're dedicated to delivering exceptional service and support at every step of your renting journey.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="title">
                <h1 className="title">Contact Us</h1>
            </div>
            <div className="row justify-content-center">
                
                    <div className="card p-3 shadow border-top border-2 rounded h-100">
                    <div className="row">
                            <p className="card-text">
                                <strong>AnytimeGear</strong><br />
                                <strong>Address:</strong> 123 Main Street, Anytown, USA<br />
                                <strong>Phone:</strong> 555-123-4567<br />
                                <strong>Email:</strong> info@anytimegear.com
                        </p>
                            <div>
                            <h2 className="card-title">Connect With Us</h2>
                        </div>
                            <p className="card-text">
                                Stay updated on the latest news and offers by following us on social media:<br />
                                <a href="#" className="card-link">Facebook</a><br />
                                <a href="#" className="card-link">Twitter</a><br />
                                <a href="#" className="card-link">Instagram</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default About;
