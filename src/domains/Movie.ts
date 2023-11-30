import Tag from './Tag';

/**
 * 电影
 */
export default interface Movie {
  /**
   * 番号
   */
  bango: string;

  /**
   * 缩略图
   */
  thumb: string;

  /**
   * 标题
   */
  title: string;

  /**
   * 标签
   */
  tags?: Tag[];

  /**
   * 发布时间
   */
  releaseDate: string;

  /**
   * left
   */
  x: number;

  /**
   * top
   */
  y: number;
}
