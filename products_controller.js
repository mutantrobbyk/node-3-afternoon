module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { name, description, price, image_url } = req.body;
    db.create_product([name, description, price, image_url]).then(result => {
      res.status(200).send(result);
    });
  },
  getOne: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    // console.log("this one", id);
    db.read_product([+id])
      .then(product => res.status(200).send(product))
      .catch(err => {
        res.status(500).send({ errorMessage: "Error" });
        console.log(err);
      });
  },
  getAll: (req, res) => {
    const db = req.app.get("db");
    db.read_products()
      .then(products => res.status(200).send(products))
      .catch(err => {
        res.status(500).send({ errorMessage: "Error" });
        console.log(err);
      });
  },
  update: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { desc } = req.query;
    console.log(id, desc)
    db.update_product([+id, desc])
      .then((results) => res.status(200).send(results))
      .catch(err => {
        res.status(500).send({ errorMessage: "Error" });
        console.log(err);
      });
  },
  delete: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.delete_product(id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "Error" });
        console.log(err);
      });
  }
};
