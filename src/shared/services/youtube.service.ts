import { HttpService, Injectable } from '@nestjs/common'
import { google, youtube_v3 as YoutubeV3 } from 'googleapis'
import { ConfigService } from '@shared/services/config.service'
import { stringify } from 'querystring'
import * as chardet from 'chardet'
import * as iconv from 'iconv-lite'

@Injectable()
export class YoutubeService {
  private readonly service: YoutubeV3.Youtube

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.service = google.youtube('v3')
  }

  /**
   * Youtube > Data API > Search: list
   * @see: https://developers.google.com/youtube/v3/docs/search/list?hl=ja
   */
  public search(params: YoutubeV3.Params$Resource$Search$List): Promise<YoutubeV3.Schema$SearchListResponse> {
    const _params = this.buildParams(params)
    return new Promise((resolve, reject) => {
      this.service.search.list(_params, (err, res) => err ? reject(err) : resolve(res?.data))
    })
  }

  /**
   * Youtube > Data API > Video: list
   * @see: https://developers.google.com/youtube/v3/docs/videos/list?hl=ja
   */
  public videos(params: YoutubeV3.Params$Resource$Videos$List): Promise<YoutubeV3.Schema$VideoListResponse> {
    const _params = this.buildParams(params)
    return new Promise((resolve, reject) => {
      this.service.videos.list(_params, (err, res) => err ? reject(err) : resolve(res?.data))
    })
  }

  public async searchAndVideos(
    params: YoutubeV3.Params$Resource$Search$List, total: number
  ): Promise<YoutubeV3.Schema$Video[]> {
    let pageToken = undefined

    const data = []
    while(pageToken !== 'undefined' || total > data.length) {
      // eslint-disable-next-line max-len
      console.log(`Call Youtube Data API: search and videos. videoCategoryId = ${params.videoCategoryId}, total = ${total}, progress = ${data.length}`)

      const searchData = await this.search(Object.assign({
        part: ['id'],
        type: 'video',
        regionCode: 'JP',
        pageToken
      }, params))
      if (searchData?.items?.length > 0) {
        const videoData = await this.videos(Object.assign({
          part: ['id', 'snippet', 'statistics'],
          id: searchData.items.map(i => i.id.videoId),
        }, params))
        data.push(...videoData.items)
      }
      pageToken = searchData.nextPageToken || 'undefined'

      // sleep 1 sec
      await new Promise((resolve, _) => setTimeout(() => resolve(), 1000))
    }
    return data
  }

  private buildParams<T>(params: T): T {
    return Object.assign({
      key: this.configService.get('youtube.api.key'),
      hl: 'ja',
      maxResults: 50
    }, params)
  }

  /**
   * Youtube > Autocomplete
   */
  public async suggest(keyword: string): Promise<string[]> {
    try {
      const query = stringify({
        q: keyword,
        client: 'youtube',
        hl: 'ja',
        ds: 'yt',
        json: true
      })
      const baseURL = this.configService.get('endpoint.google')
      const result = await this.httpService.get(`/complete/search?${query}`, {
        baseURL,
        responseType: 'arraybuffer',
        transformResponse: data => {
          const encoding = chardet.detect(data)
          if (!encoding) {
            throw new Error('chardet failed to detect encoding')
          }
          return iconv.decode(data, encoding)
        }
      }).toPromise()

      return result?.data ? JSON.parse(result.data)?.[1] || [] : []
    } catch(e) {
      console.error(e)
    }
  }
}
