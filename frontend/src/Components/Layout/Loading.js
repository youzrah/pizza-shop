import React from 'react'

export const Loading = () => {
    return (
        <div style={{
            position: "absolute",
            top: "40%",
            left: "40%",
            transform: "translate(-50 %, -50 %)",
        }}>
            <div className="spinner-border" style={{ width: "3rem", height: "3rem", color: "#495E57" }} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
