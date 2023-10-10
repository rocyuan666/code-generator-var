import { ElMessage, ElMessageBox, ElNotification, ElLoading } from 'element-plus'

let loadingInstance

export default {
  /**
   * 消息提示
   * @param {import('element-plus').MessageParamsWithType} content
   */
  msg(content) {
    ElMessage.info(content)
  },

  /**
   * 错误消息
   * @param {import('element-plus').MessageParamsWithType} content
   */
  msgError(content) {
    ElMessage.error(content)
  },

  /**
   * 成功消息
   * @param {import('element-plus').MessageParamsWithType} content
   */
  msgSuccess(content) {
    ElMessage.success(content)
  },

  /**
   * 警告消息
   * @param {import('element-plus').MessageParamsWithType} content
   */
  msgWarning(content) {
    ElMessage.warning(content)
  },

  /**
   * 弹出提示
   * @param {import('element-plus').ElMessageBoxOptions['message']} content
   */
  alert(content) {
    ElMessageBox.alert(content, '系统提示').then()
  },

  /**
   * 错误提示
   * @param {import('element-plus').ElMessageBoxOptions['message']} content
   */
  alertError(content) {
    ElMessageBox.alert(content, '系统提示', { type: 'error' }).then()
  },

  /**
   * 成功提示
   * @param {import('element-plus').ElMessageBoxOptions['message']} content
   */
  alertSuccess(content) {
    ElMessageBox.alert(content, '系统提示', { type: 'success' }).then()
  },

  /**
   * 警告提示
   * @param {import('element-plus').ElMessageBoxOptions['message']} content
   */
  alertWarning(content) {
    ElMessageBox.alert(content, '系统提示', { type: 'warning' }).then()
  },

  /**
   * 通知提示
   * @param {import('element-plus').NotificationParamsTyped} content
   */
  notify(content) {
    ElNotification.info(content)
  },

  /**
   * 错误通知
   * @param {import('element-plus').NotificationParamsTyped} content
   */
  notifyError(content) {
    ElNotification.error(content)
  },

  /**
   * 成功通知
   * @param {import('element-plus').NotificationParamsTyped} content
   */
  notifySuccess(content) {
    ElNotification.success(content)
  },

  /**
   * 警告通知
   * @param {import('element-plus').NotificationParamsTyped} content
   */
  notifyWarning(content) {
    ElNotification.warning(content)
  },

  /**
   * 确认窗体
   * @param {import('element-plus').ElMessageBoxOptions['message']} content
   * @returns {Promise<import('element-plus').MessageBoxData>}
   */
  confirm(content) {
    return ElMessageBox.confirm(content, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
  },

  /**
   * 提交内容
   * @param {import('element-plus').ElMessageBoxOptions['message']} content
   * @returns {Promise<import('element-plus').MessageBoxData>}
   */
  prompt(content) {
    return ElMessageBox.prompt(content, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
  },

  /**
   * 打开遮罩层
   * @param {import('vue').Ref<String> | String} content
   */
  loading(content) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: content,
      background: 'rgba(0, 0, 0, 0.7)',
    })
  },

  /**
   * 关闭遮罩层
   */
  closeLoading() {
    loadingInstance.close()
  },
}
