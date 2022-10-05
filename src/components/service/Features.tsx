import { Typography } from "@material-ui/core"
import React from "react"

interface FeaturesProps {
  title: string
  description: string
}

const Features = ({ title, description }: FeaturesProps) => {

  return (
    <>
      <div style={{marginTop: "3rem"}}>
        <Typography variant="h2" align="left" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">
          {description}
        </Typography>
      </div>
    </>
  )
}

export default Features