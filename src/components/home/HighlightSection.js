import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import styles from "./HighlightSection.module.css";
import config from "../../core/config";

const HighlightSection = ({ data = {} }) => {
  const [sectionData, setSectionData] = useState(data);

  useEffect(() => {
    setSectionData(data);
    // setCategories(data.section_content)
  }, [data]);

  console.log(data);

  if (sectionData && sectionData.length !== 0) {
    return (
      <div className={styles.init}>
        <div className="container-fluid">
          <div className="row g-2">
            <div className="col-lg-12">
              <h2 className={`section-title text-center`}>
                {sectionData.section_title ?? ""}
              </h2>
              <p className={`section-subtitle text-center`}>
                {sectionData.description ?? ""}
              </p>
            </div>
            <div className="col-lg-4 p-1">
              <div
                className={styles.mainBox}
                style={{
                  backgroundImage: `url(${sectionData.section_content?.[0].image})`,
                }}
              ></div>
            </div>
            <div className="col-lg-4 p-1">
              <div
                className={styles.mainBox}
                style={{
                  backgroundImage: `url(${sectionData.section_content?.[1].image})`,
                }}
              ></div>
            </div>
            <div className="col-lg-4 p-1">
              <div
                className={styles.mainBox}
                style={{
                  backgroundImage: `url(${sectionData.section_content?.[2].image})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default HighlightSection;
