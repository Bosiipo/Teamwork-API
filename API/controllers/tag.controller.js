import Article from '../models/Article.model';
import Tag from '../models/Tag.model';

class TagController {
  static async createTag(req, res) {
    try {
      const { employee } = req;

      // Create and save the order
      const savedTag = await Tag.create(
        req.body,
        { w: 1 },
        { returning: true }
      );

      console.log(req.body);

      console.log(employee);

      employee.article.forEach(item => {
        const article = Article.findById(item.id);
        if (!article) {
          return res.status(400);
        }

        const artag = {
          tagId: savedTag.id,
          articleId: item.id,
          qty: item.qty,
        };

        const savedArticleTag = ArticleTag.create(
          artag,
          { w: 1 },
          { returning: true }
        );
      });

      return res.status(200).json(savedTag);
    } catch (err) {
      return res.status(500).json({
        status: err,
        message: err.message,
      });
    }
  }

  static async getAllTags(req, res) {
    try {
      const allTags = await Tag.findAll({
        // Make sure to include the articles
        include: [
          {
            model: Article,
            as: 'article',
            required: false,
            // Pass in the Article attributes that you want to retrieve
            attributes: ['id', 'title'],
            through: {
              // This block of code allows you to retrieve the properties of the join table
              model: ArticlesTag,
              as: 'articlesTag',
              attributes: ['qty'],
            },
          },
        ],
      });

      // If everything goes well respond with the tags
      return respondWith(res, 200, ['Returning all articles'], { allTags });
    } catch (err) {
      return res.status(500).json({
        status: err,
        message: err.message,
      });
    }
  }
}

export default TagController;
