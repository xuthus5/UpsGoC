<template>
    <div class="admin">
        <main class="dash-content">
            <div class="container-fluid">
                <b-container fluid class="mt-4 mb-4">
                    <b-row>
                        <b-col xl="10" lg="10" md="12" sm="12" offset-xl="1" offset-lg="1" offset-md="1">
                            <div class="card shadow">
                                <div class="card-header border-0">
                                    <div class="row align-items-center">
                                        <b-button type="button" variant="primary" class="mr-2" v-b-modal.upload>
                                            <i class="fas fa-cloud-upload-alt"></i> 上传
                                        </b-button>
                                        <b-button type="button" variant="primary" class="mr-2" v-b-modal.mkdir>
                                            <i class="fas fa-folder-plus"></i> 创建目录
                                        </b-button>
                                        <b-button v-if="current_path !== '/'" type="button" variant="primary" class="mr-2" @click="backDir">
                                            <i class="fas fa-folder-plus"></i> 返回上级
                                        </b-button>

                                        <div class="col text-right">
                                            <b-button type="button" variant="primary" @click="refresh">
                                                <i class="fas fa-sync-alt"></i> 刷新
                                            </b-button>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <b-table striped hover :items="items" :fields="fields" table-class="table-style">
                                        <template v-slot:cell(Name)="row">
                                            <div class="media align-items-center first-field-style">
                                                <div v-if="row.item.IsDir">
                                                    <span class="avatar rounded-circle"
                                                          style="font-size: 24px; color: Dodgerblue;">
                                                    <i class="fas fa-folder"></i>
                                                    </span>
                                                    <span class="name mb-0 text-sm">
                                                        <a href="javascript:void(0)" @click="changeDir(row.value)">{{row.value}}</a>
                                                    </span>
                                                </div>

                                                <div v-else>
                                                    <span class="avatar rounded-circle"
                                                          style="font-size: 24px; color: Mediumslateblue;">
                                                        <i :class="iconType(row.value)"></i>
                                                    </span>
                                                    <span class="name mb-0 text-sm">
                                                        {{row.value}}
                                                    </span>
                                                </div>

                                            </div>
                                        </template>
                                        <template v-slot:cell(Size)="row">
                                            <div class="field-style">
                                                <span v-if="row.item.IsDir">
                                                    -
                                                </span>
                                                <span v-else>
                                                    {{calcSize(row.value)}}
                                                </span>
                                            </div>
                                        </template>

                                        <template v-slot:cell(Time)="row">
                                            <div class="field-style">
                                                {{new Date(row.value).toLocaleString()}}
                                            </div>
                                        </template>

                                        <template v-slot:cell(actions)="row">
                                            <div class="field-style text-primary" v-clipboard:copy="getLink(row.item.Name)">
                                                <a v-if="!row.item.IsDir" class="share" title="复制链接">
                                                    <i class="fas fa-link"></i>
                                                </a>
                                                <a v-if="!row.item.IsDir" target="_blank" class="preview" title="预览下载" :href="getLink(row.item.Name)">
                                                    <i class="fas fa-eye"></i>
                                                </a>
                                                <a class="remove" title="删除" @click="deleteFile(row.item.Name)">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </div>
                                        </template>

                                    </b-table>
                                </div>
                                <div class="card-footer d-flex justify-content-end">
                                    <b-pagination
                                            v-model="pagination.currentPage"
                                            :total-rows="rows"
                                            :per-page="pagination.perPage"
                                            aria-controls="my-table"
                                    ></b-pagination>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </main>
        <footer>
            <router-link :to="{name:'Home'}" class="btn btn-primary">回首页</router-link>
        </footer>
        <b-modal id="upload" centered title="上传" hide-footer hide-header-close>
            <div class="text-center p-4">
                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" :useCustomSlot=true
                              @vdropzone-sending="sendingEvent" @vdropzone-complete="completeUpload">
                    <div class="dropzone-custom-content">
                        <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
                    </div>
                </vue-dropzone>

                <b-form-input class="mt-2" v-model="current_path" placeholder="上传目录"></b-form-input>

                <b-button variant="primary" class="mt-2">上传</b-button>
                <b-button variant="danger" class="mt-2 ml-2" @click="reset">重置</b-button>
            </div>
        </b-modal>
        <b-modal id="mkdir" centered title="创建目录" hide-footer hide-header-close>
            <div class="text-center p-4">
                <b-form-input class="mt-2" v-model="operate_path" placeholder="绝对路径,限制256字符, / 是目录分隔符"></b-form-input>
                <b-button variant="primary" class="mt-2" @click="mkdir">创建</b-button>
                <b-button variant="danger" class="mt-2 ml-2" @click="operate_path = ''">重置</b-button>
            </div>
        </b-modal>
        <b-modal id="delete" centered title="删除对象" hide-footer hide-header-close>
            <div class="text-center p-4">
                <h3>
                    你确定要删除吗？(非空文件夹无法删除)
                </h3>
                <b-button variant="primary" class="mt-2" @click="realDeleteFile">删除</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import FileTools from "../components/FileTools";
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'

    export default {
        name: 'admin',
        components: {
            vueDropzone: vue2Dropzone
        },
        data() {
            return {
                current_path: '/',
                operate_path: '',
                file: null,
                dropzoneOptions: {
                    url: this.server + '/api/core/upload',
                    thumbnailWidth: 150,
                    maxFilesize: 50,
                    headers: {"token": localStorage.getItem('_token')}
                },
                fields: [
                    {key: 'Name', label: '文件名'},
                    {key: 'Size', label: '大小', sortable: true},
                    {key: 'Time', label: '上传时间', class: 'text-center', sortable: true},
                    {key: 'actions', label: '操作'},
                ],
                items: [],
                path_items: [
                    '/'
                ],
                pagination: {
                    perPage: 15,
                    currentPage: 1,
                },
            }
        },
        methods: {
            iconType(filename) {
                let res = FileTools.matchType(filename);
                let result = res.result;
                if (result === 'image') {
                    //图片后缀
                    return {
                        fas: true,
                        'fas fa-file-image': true
                    }
                } else if (result === 'radio') {
                    return {
                        fas: true,
                        'fas fa-file-audio': true
                    }
                } else if (result === 'archive') {
                    return {
                        fas: true,
                        'fa-file-archive': true
                    }
                } else if (result === 'video') {
                    return {
                        fas: true,
                        'fas fa-file-video': true
                    }
                } else if (result === 'word') {
                    return {
                        fas: true,
                        'fas fa-file-word': true
                    }
                } else if (result === 'pdf') {
                    return {
                        fas: true,
                        'fas fa-file-pdf': true
                    }
                } else if (result === 'ppt') {
                    return {
                        fas: true,
                        'fas fa-file-powerpoint': true
                    }
                } else if (result === 'excel') {
                    return {
                        fas: true,
                        'fas fa-file-excel': true
                    }
                } else if (result === 'code') {
                    return {
                        fas: true,
                        'fas fa-file-code': true
                    }
                } else {
                    //没有后缀或者没有匹配到相关后缀 返回一个未知类型
                    return {
                        fas: true,
                        'fas fa-question': true
                    }
                }
            },
            calcSize(size) {
                size = (size / 1024).toFixed(2);
                if (size <= 1024) return size + ' KB';//小于M
                size = (size / 1024).toFixed(2);
                if (size <= 1024) return size + ' MB';//小于G
                size = (size / 1024).toFixed(2);
                if (size <= 1024) return size + ' GB';//小于T
            },
            reset() {
                //清空dropzone的上传成功列表
                this.$refs.myVueDropzone.removeAllFiles();
            },
            refresh() {
                let headers = {
                    token: localStorage.getItem("_token"),
                };
                this.http
                    .get(this.server + "/api/core/list?path=" + this.current_path, {
                        headers: headers
                    })
                    .then(response => {
                        this.items.splice(0);
                        this.items.push.apply(this.items, response.data.data);
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            },
            sendingEvent(file, xhr, formData) {
                formData.append('path', this.current_path);
            },
            completeUpload(response) {
                if (response.status === 'success') {
                    this.$bvModal.hide('upload');
                    this.refresh();
                }else {
                    alert(response.status)
                }
            },
            changeDir(path) {
                this.path_items.push(path);
                this.current_path = this.current_path + path + '/';
                this.refresh();
            },
            mkdir(){
                let headers = {
                    token: localStorage.getItem("_token"),
                };
                this.http
                    .get(this.server + "/api/core/mkdir?dir=" + this.operate_path, {
                        headers: headers
                    })
                    .then(response => {
                        this.$bvModal.hide('mkdir');
                        this.refresh();
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            },
            backDir() {
                // this.path_items.splice(this.path_items.length-1, 1);
                this.path_items = this.path_items.filter(function(ele,idx,arr){
                    return arr.length - 1 !== idx;
                });
                if (this.path_items.length === 1) {
                    this.current_path = '/';
                    this.refresh();
                }else {
                    this.current_path = '/';
                    for(let j = 1,len=this.path_items.length; j < len; j++) {
                        this.current_path = this.current_path + this.path_items[j] + '/';
                    }
                    this.refresh();
                }
            },
            getLink(name) {
                return this.domain+this.current_path+name;
            },
            deleteFile(name) {
                this.operate_path = this.current_path + name;
                this.$bvModal.show('delete');
            },
            realDeleteFile() {
                let headers = {
                    token: localStorage.getItem("_token"),
                };
                this.http
                    .get(this.server + "/api/core/delete?path=" + this.operate_path, {
                        headers: headers
                    })
                    .then(response => {
                        this.$bvModal.hide('delete');
                        this.refresh();
                    })
                    .catch(error => {
                        alert(error.response.data.message);
                    });
            },
            checkLogin(){
                if (localStorage.getItem('_token') === null) {
                    this.$router.push({name:'SignIn'})
                }
            },
        },
        created() {
            this.checkLogin();
            this.refresh();
        },
        computed: {
            rows() {
                return this.items.length
            }
        }
    }
</script>

<style lang="scss">

    .dropzone-custom-content {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .dropzone-custom-title {
        margin-top: 0;
        color: #00b782;
    }

    .subtitle {
        color: #314b5f;
    }

    .stats-percentage {
        padding-right: 5px;
        color: #ffde08;
    }

    .card {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, .05);
        border-radius: .375rem;
        transition: all .15s ease;
    }

    .card-header {
        background-color: #fff;
    }

    .btn-primary, .btn-danger {
        border-radius: 5px !important;
    }

    .breadcrumb {
        background-color: rgba(0, 0, 0, 0) !important;
        margin-bottom: 0 !important;
    }

    .avatar {
        color: #fff;
        background-color: rgba(0, 0, 0, 0);
        display: inline-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        font-size: 1rem;
        border-radius: 50%;
        height: 48px;
        width: 48px;
    }

    .rounded-circle {
        border-radius: 50% !important;
    }

    .path-style {
        font-size: .85rem;
        font-family: Open Sans, sans-serif;
        color: #09aaff;
    }

    .first-field-style {
        padding-left: 10px;
        text-align: left;
    }

    .field-style {
        justify-content: center;
        align-items: center;
        line-height: 46px;
        height: 46px;
    }

    .table-style {
        font-family: Open Sans, sans-serif;
        font-size: 1rem;

        thead {
            background-color: #f6f9fc;
            color: #8898aa;

            tr {
                th {
                    padding-left: 1.5rem;
                    padding-right: 1.5rem;
                }
            }
        }

        tbody tr td {
            padding-left: 1.4rem;
        }

        .far {
            padding-right: 5px;
            color: Dodgerblue;
        }

        .fas {
            padding-right: 5px;
        }
    }
</style>