import React from "react"
import { Container, Grid } from "semantic-ui-react"
import NavBarSecondary from "../../components/NavBarSecondary"

//css
import "../../sass/index.scss"

export default function BasicLayout(props) {
  const { children, view } = props

  return (
    <Container fluid className="basic-layout">
      <Grid>
        <Grid.Column mobile={16} tablet={2} computer={1}>
          <NavBarSecondary view={view}></NavBarSecondary>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={14} computer={15}>
          {children}
        </Grid.Column>
      </Grid>
    </Container>
  )
}
