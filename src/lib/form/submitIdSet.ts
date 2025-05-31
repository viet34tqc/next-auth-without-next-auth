// This class is used to manage the submit ID list
// To prevent duplicate form submissions
class SubmitIdManager {
  private static instance: SubmitIdManager
  private submitIdList: Set<string>

  private constructor() {
    this.submitIdList = new Set<string>()
  }

  public static getInstance(): SubmitIdManager {
    if (!SubmitIdManager.instance) {
      SubmitIdManager.instance = new SubmitIdManager()
    }
    return SubmitIdManager.instance
  }

  public add(id: string) {
    this.submitIdList.add(id)
  }

  public has(id: string) {
    return this.submitIdList.has(id)
  }

  public clear() {
    this.submitIdList.clear()
  }

  public getList() {
    return this.submitIdList
  }
}

const submitIdManager = SubmitIdManager.getInstance()

export const addSubmitId = (id: string) => submitIdManager.add(id)
export const hasSubmitId = (id: string) => submitIdManager.has(id)
export const clearSubmitIdList = () => submitIdManager.clear()
export const submitIdList = submitIdManager.getList()
