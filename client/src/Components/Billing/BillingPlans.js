import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  appBar: {
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(900 + theme.spacing(3, 2))]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  heroContent: {
    maxWidth: 1200,
    width: "100%",
    margin: "0 auto",
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },
  cardActions: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(2)
    }
  },
  button: {
    background: "#40A798",
    fontSize: 16,
    color: "#ffffff"
  },
  secTitle: {
    fontFamily: "Oswald",
    fontSize: "3.5rem"
  },
  secSub: {
    fontSize: "1.6rem",
    fontWeight: 300
  }
});

const tiers = [
  {
    title: "Basic (Free)",
    price: "0",
    description: [
      "Food entry",
      "One week food diary options",
      "Help center access",
      "Email support"
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined"
  },
  {
    title: "Premium",
    subheader: "Most popular",
    price: "7",
    description: [
      "All basic features",
      "Access to all report types",
      "Food Analysis",
      "Access to view one friend's progress!"
    ],
    buttonText: "Get started",
    buttonVariant: "contained"
  },
  {
    title: "Coach",
    price: "10",
    description: [
      "All basic & premium features",
      "Have access to your client's nutrition profile",
      "Give advice to clients",
      "Access to all future coach features"
    ],
    buttonText: "Login with User Account",
    buttonVariant: "outlined"
  }
];

function Pricing(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <div className={classes.heroContent}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            className={classes.secTitle}
            gutterBottom
          >
            Pricing
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            component="p"
          >
            Take advantage of our popular premium account to get the full
            experience that we have to offer!
          </Typography>
        </div>
        <Grid container alignItems="flex-end" justify="center">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              className={classes.cardCon}
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Premium" ? 12 : 6}
              md={4}
            >
              <Card
                className={classes.cardCon}
                data-aos={tier.title === "Premium" ? "flip-left" : "zoom-in"}
                data-aos-easing="linear"
                data-aos-duration="1500"
              >
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.title === "Premium" ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  {tier.description.map(line => (
                    <Typography variant="subtitle1" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions className={classes.cardActions}>
                  {tier.title === "Premium" ? (
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      className={classes.button}
                      component={Link}
                      to="/login"
                    >
                      {" "}
                      {tier.buttonText}
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      className={classes.button}
                      component={Link}
                      to="/login"
                    >
                      {" "}
                      {tier.buttonText}
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </React.Fragment>
  );
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pricing);
