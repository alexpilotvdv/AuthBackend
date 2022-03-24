import pool from './config.js'
class PostController {
   create(req, res) {
    const { autor, title, content, pic } = req.body;
    let zapr = `INSERT INTO posts (autor, title,content,picture) 
        VALUES ('${autor}', '${title}','${content}','${pic}');`;
    //записываем в базу
    pool.query(zapr, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  }
  allrec(req,res){
    pool.query('SELECT * FROM posts', (error, result) => {
        if (error) throw error;
        res.send(result);
      });
  }
  getOne(req,res){
      const {id} = req.params
      if (!id){
          res.status(400).json({message:'id not '})
      }
      const sql = `SELECT * FROM posts WHERE id='${id}'`
      pool.query(sql, (error, result) => {
        if (error) throw error;
        res.send(result);
      });
  }
}
export default new PostController();
