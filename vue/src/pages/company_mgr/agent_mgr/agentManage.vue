<template>
  <div id="agent_manage">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公司管理</el-breadcrumb-item>
        <el-breadcrumb-item>银保代理人员匹配管理</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <!-- 条件查询 -->
    <el-form class="agent_manage_form">
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-radio-group v-model="radio" @change="radioChange">
              <el-radio label="1">按网点</el-radio>
              <el-radio label="2">按业务员</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <ui-label-text label="生效日期：" labelWidth="120" >
              <el-date-picker slot="text" v-model="timer" type="daterange" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="保险公司代码：" labelWidth="120" >
            <el-input slot="text" :disabled="isInput" placeholder="双击选择" clearable @dblclick.native="!isInput && getComInfo(1, 0)" v-model="searchData.comCode" @blur='blurCom(0, 0, $event)' ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="保险公司名称：" labelWidth="120" >
            <el-input slot="text" :disabled="isInput" placeholder="双击选择" clearable @dblclick.native="!isInput && getComInfo(1, 0)" v-model="searchData.comName" @blur='blurCom(0, 1, $event)' ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="银行渠道代码：" labelWidth="120" >
              <el-input slot="text" :disabled="isInput" placeholder="双击选择" clearable @dblclick.native="!isInput && getInfoBank(1,'getChannel', 0)" @blur='blurBank(0, 0, $event)'  v-model="searchData.bankChannelCode" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="银行渠道名称：" labelWidth="120" >
            <el-input slot="text" :disabled="isInput" placeholder="双击选择" clearable  @dblclick.native="!isInput && getInfoBank(1,'getChannel', 0)" v-model="searchData.bankChannelName" @blur='blurBank(0, 1, $event)' ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="网点代码：" labelWidth="120" >
            <el-input slot="text" :disabled="isInput" placeholder="双击选择" v-model="searchData.networkCode" @dblclick.native="!isInput && getInfoNet(1,'getNetwork', 0)" clearable ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="网点名称：" labelWidth="120" >
            <el-input slot="text" :disabled="isInput" placeholder="双击选择"  @dblclick.native="!isInput && getInfoNet(1,'getNetwork', 0)" clearable v-model="searchData.networkName" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="归属业务员代码：" labelWidth="120" >
              <el-input slot="text" :disabled="isInputPeo" placeholder="双击选择" clearable @dblclick.native="!isInputPeo && getInfoAgent(1,'getAgen', 0)"  @blur='blurAgent(0, 0, $event)' v-model="searchData.agenCode" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="归属业务员名称：" labelWidth="120" >
              <el-input slot="text" :disabled="isInputPeo" placeholder="双击选择" @dblclick.native="!isInputPeo && getInfoAgent(1,'getAgen', 0)" @blur='blurAgent(0, 1, $event)' clearable v-model="searchData.agenName" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 基础操作按钮 -->
    <div class='btn-container'>
      <el-button type="primary" :disabled="!limt.query" @click.native.prevent="searchAgent(1)" >查询</el-button>
      <el-button type="primary" :disabled="!limt.add" @click.native.prevent=" isAdd = true" >新增</el-button>
      <el-button size="primary" :disabled="!limt.modify" @click.native.prevent="modify" >修改</el-button>
      <el-button type="primary" :disabled="!limt.import" @click.native.prevent="isImport = true " >批量导入</el-button>
      <el-button type="primary" :disabled="!limt.export" @click.native.prevent="outImport" >导出</el-button>
    </div>
    <!-- 查询结果 -->
    <el-table stripe ref="multipleTable" :data="agentTableData" v-if='isShowTable' tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange"  >
      <el-table-column type="selection" width="55" >
      </el-table-column>
      <el-table-column prop="networkcode" label="网点代码" width="150" >
        <template slot-scope="scope">
          <a href="javascript:void(0)" @click="detail(scope.row)">{{scope.row.networkcode}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="networkname" label="网点名称" width="150" ></el-table-column>
      <el-table-column prop="agencode" label="归属业务员代码" width="150" > </el-table-column>
      <el-table-column prop="agenname" label="归属业务员姓名" width="150" ></el-table-column>
      <el-table-column prop="time" label="归属业务员生效日期" width="150" > </el-table-column>
      <el-table-column prop="comcode" label="归属公司代码" width="150" ></el-table-column>
      <el-table-column prop="comname" label="归属公司名称" width="150" ></el-table-column>
      <el-table-column prop="bankchannelcode" label="银行渠道代码" width="150" ></el-table-column>
      <el-table-column prop="bankchannelname" label="银行渠道名称" width="150" ></el-table-column>
    </el-table>
    <!-- 查询分页 -->
    <div class="pagination" v-if='isShowTable'>
      <el-pagination @current-change='handleCurrentChange' :current-page.sync="current" :pager-count='5' :page-size='5' :page-sizes='[5, 10, 20, 50]' :total="seaTotalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="seaTotalPages" @size-change="handleSizeChange"></el-pagination>
    </div>
    <!-- 新增银保代理 -->
    <el-dialog :append-to-body='true' @close='closeAdd' center width='70%' title="银保代理人员匹配新增"  :visible.sync="isAdd" >
      <ui-line-tittle :collapsible="true" >
        <span slot="title" >
          <i class="font_family icon-jy-menu-4" ></i>银保代理人员匹配新增
        </span>
        <div class="ri-content" slot="content" >
          <el-form class="mesg_form" :model="addData" ref="addData" :rules="rules" >
            <el-row>
              <el-col :span="12">
                <el-form-item prop='comcode'>
                  <ui-label-text label="保险公司代码：" :required="true" labelWidth="150" >
                    <el-input slot="text" @blur="blurCom(1, 0, $event)" placeholder="双击选择" clearable v-model="addData.comcode" @dblclick.native="getComInfo(1, 1)" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop='comname'>
                  <ui-label-text label="保险公司名称：" :required="true" labelWidth="150" >
                    <el-input slot="text" @blur="blurCom(1, 1, $event)" placeholder="双击选择" clearable  v-model="addData.comname" @dblclick.native="getComInfo(1, 1)"  ></el-input>
                  </ui-label-text>
                 </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop='bankchannelcode'>
                  <ui-label-text label="银行渠道代码：" :required="true" labelWidth="150" >
                    <el-input slot="text" clearable placeholder="双击选择"  v-model="addData.bankchannelcode" @dblclick.native="getInfoBank(1,'getChannel', 1)" @blur="blurBank(1, 0, $event)" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop='bankchannelname'>
                  <ui-label-text label="银行渠道名称：" :required="true" labelWidth="150" >
                    <el-input slot="text" clearable @blur="blurBank(1, 1, $event)" placeholder="双击选择" v-model="addData.bankchannelname" @dblclick.native="getInfoBank(1,'getChannel', 1)"  ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop='networkcode'>
                  <ui-label-text label="网点代码：" :required="true" labelWidth="150" >
                    <el-input slot="text"  v-model="addData.networkcode" clearable ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop='networkname'>
                  <ui-label-text label="网点名称：" :required="true" labelWidth="150" >
                    <el-input slot="text"  v-model="addData.networkname" clearable ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop='agencode'>
                  <ui-label-text label="归属业务员代码：" :required="true" labelWidth="150" >
                    <el-input slot="text" placeholder="双击选择" @blur='blurAgent(1, 0, $event)' clearable v-model="addData.agencode" @dblclick.native="getInfoAgent(1,'getAgen', 1)" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop='agenname'>
                  <ui-label-text label="归属业务员名称：" :required="true" labelWidth="150" >
                    <el-input slot="text" placeholder="双击选择" @blur='blurAgent(1, 1, $event)' clearable v-model="addData.agenname" @dblclick.native="getInfoAgent(1,'getAgen', 1)" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item prop='createdate'>
                <ui-label-text  label="归属业务员生效日期：" :required="true" labelWidth="150" >
                  <el-date-picker slot="text"  value-format="yyyy-MM-dd" v-model="addData.createdate" type="date" placeholder="选择日期"></el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
      </ui-line-tittle>
      <div style="text-align: center; margin-top: 30px;" >
          <el-button type='primary' @click.native.prevent="addPut">提交</el-button>
      </div>
    </el-dialog>
    <!-- 修改银保代理 -->
    <el-dialog :append-to-body='true' center width='70%' title="银保代理人员匹配修改"  :visible.sync="isModify" >
      <ui-line-tittle :collapsible="true" >
        <span slot="title" >
          <i class="font_family icon-jy-menu-4" ></i>银保代理人员匹配修改
        </span>
        <div class="ri-content" slot="content" >
          <el-form class="mesg_form mod_form" :model="modifyData" ref="modifyData" :rules="rules" >
            <el-row>
              <el-col :span="12">
                <el-form-item  prop='comcode'>
                  <ui-label-text label="保险公司代码：" :required="true" labelWidth="150" >
                    <el-input slot="text" placeholder="双击选择" @blur='blurCom(2, 0, $event)' clearable v-model="modifyData.comcode" @dblclick.native="getComInfo(1, 2)" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop='comname'>
                  <ui-label-text label="保险公司名称：" :required="true" labelWidth="150" >
                    <el-input slot="text" clearable placeholder="双击选择" @blur='blurCom(2, 1, $event)' v-model="modifyData.comname" @dblclick.native="getComInfo(1, 2)"  ></el-input>
                  </ui-label-text>
                 </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop='bankchannelcode'>
                  <ui-label-text label="银行渠道代码：" :required="true" labelWidth="150" >
                    <el-input slot="text" placeholder="双击选择" clearable v-model="modifyData.bankchannelcode" @dblclick.native="getInfoBank(1,'getChannel', 2)" @blur="blurBank(2, 0, $event)"  ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop='bankchannelname'>
                  <ui-label-text label="银行渠道名称：" :required="true" labelWidth="150" >
                    <el-input slot="text" placeholder="双击选择" clearable v-model="modifyData.bankchannelname" @dblclick.native="getInfoBank(1,'getChannel', 2)" @blur="blurBank(2, 1, $event)" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  prop='networkcode'>
                  <ui-label-text label="网点代码：" :required="true" labelWidth="150" >
                    <el-input slot="text"  v-model="modifyData.networkcode" :disabled="true" clearable ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop='networkname'>
                  <ui-label-text label="网点名称：" :required="true" labelWidth="150" >
                    <el-input slot="text"  v-model="modifyData.networkname" clearable ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop='agencode'>
                  <ui-label-text label="归属业务员代码：" :required="true" labelWidth="150" >
                    <el-input slot="text" clearable placeholder="双击选择" @blur='blurAgent(2, 0, $event)' v-model="modifyData.agencode" @dblclick.native="getInfoAgent(1,'getAgen', 2)"  ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop='agenname'>
                  <ui-label-text label="归属业务员名称：" :required="true" labelWidth="150" >
                    <el-input slot="text" placeholder="双击选择" @blur='blurAgent(2, 0, $event)' clearable  v-model="modifyData.agenname" @dblclick.native="getInfoAgent(1,'getAgen', 2)" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop='createdate'>
                  <ui-label-text  label="归属业务员生效日期：" :required="true" labelWidth="150" >
                    <el-date-picker slot="text"  value-format="yyyy-MM-dd" v-model="modifyData.createdate" type="date" placeholder="选择日期"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </ui-line-tittle>
      <div style="text-align: center; margin-top: 30px;" >
          <el-button type='primary' @click.native.prevent="modifyPut">提交</el-button>
      </div>
    </el-dialog>
    <!-- 查看银保代理 -->
    <el-dialog :append-to-body='true' center width='70%' title="银保代理人员匹配详情"  :visible.sync="isDetail" >
      <ui-line-tittle :collapsible="true" >
        <span slot="title" >
          <i class="font_family icon-jy-menu-4" ></i>银保代理人员匹配详情
        </span>
        <div class="ri-content" slot="content" >
          <el-form class="mesg_form" :model="detailData" >
            <el-row>
              <el-col :span="12">
                <el-form-item prop='comcode'>
                  <ui-label-text :required="true"  label="保险公司代码：" labelWidth="150" >
                    <el-input slot="text" v-model="detailData.comcode" :disabled="true"></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop='comname'>
                  <ui-label-text :required="true"  label="保险公司名称：" labelWidth="150" >
                    <el-input slot="text"  v-model="detailData.comname" :disabled="true" ></el-input>
                  </ui-label-text>
                 </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item required prop='bankchannelcode'>
                  <ui-label-text :required="true"  label="银行渠道代码："  labelWidth="150" >
                    <el-input slot="text" v-model="detailData.bankchannelcode" :disabled="true" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop='bankchannelname'>
                  <ui-label-text :required="true"  label="银行渠道名称：" labelWidth="150" >
                    <el-input slot="text"  v-model="detailData.bankchannelname" :disabled="true" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  prop='networkcode'>
                  <ui-label-text :required="true"  label="网点代码：" labelWidth="150" >
                    <el-input slot="text" v-model="detailData.networkcode" :disabled="true" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop='networkname'>
                  <ui-label-text :required="true"  label="网点名称："  labelWidth="150" >
                    <el-input slot="text"  v-model="detailData.networkname" :disabled="true" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item required prop='agencode'>
                  <ui-label-text :required="true"  label="归属业务员代码："  labelWidth="150" >
                    <el-input slot="text" v-model="detailData.agencode" :disabled="true" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item required prop='agenname'>
                  <ui-label-text :required="true"  label="归属业务员名称：" labelWidth="150" >
                    <el-input slot="text"  v-model="detailData.agenname" :disabled="true" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop='createdate'>
                  <ui-label-text  label="归属业务员生效日期：" :required="true" labelWidth="150" >
                    <el-date-picker :disabled="true" slot="text"  value-format="yyyy-MM-dd hh:mm:ss" v-model="detailData.createdate" type="date" placeholder="选择日期"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </ui-line-tittle>
    </el-dialog>
    <!-- 上传弹框 -->
    <el-dialog :append-to-body='true' @close='closeLoad' center width='40%' title="银保代理人员匹配信息导入"  :visible.sync="isImport" >
      <div class="download">
        <a @click="downTemp()" href="javascript:void(0)" download>导入模板下载</a>
      </div>
      <div class="upLoad">
        <el-upload class="upload-demo" :action="uploadUrl()" :limit="1" accept='xls' :on-success="handleEXLSuccess" :file-list="fileList">
          <el-button size="small" style="text-align: center; " type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </el-dialog>
    <!-- 获取银行渠道 -->
    <el-dialog title="银行渠道" :before-close='closeBlank' :append-to-body='true' :visible.sync="bank_dialog" width="50%" center>
      <el-table stripe @row-click='selectRow' ref="multipleTable" :data="tableData" >
        <el-table-column prop="bankcode" label="银行渠道代码" center ></el-table-column>
        <el-table-column prop="bankname" label="银行渠道名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination  @current-change='bankCurrentChange' :page-sizes='bankSize' :current-page.sync="currentLog"   :pager-count='5'  layout="total, sizes, prev, pager, next, jumper" :total="totalRecords" :page-size="5" @size-change="bankSizeChange"> </el-pagination>
      </div>
    </el-dialog>
    <!-- 获取保险公司 -->
    <el-dialog title="保险公司" :before-close='closeCom' :append-to-body='true' :visible.sync="com_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowCom' ref="multipleTable" :data="insComTableData" >
        <el-table-column prop="insurercode" label="保险公司代码" center ></el-table-column>
        <el-table-column prop="insurername" label="保险公司名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="comSizeChange" small @current-change='comCurrentChange' :current-page.sync="currentLog" :pager-count='5' :page-size='5' :page-sizes='comSize'  :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
      </div>
    </el-dialog>
    <!-- 获取网点 -->
    <el-dialog title="网点" :before-close='closeNet' :append-to-body='true' :visible.sync="net_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowNet' ref="multipleTable" :data="netTableData" >
        <el-table-column prop="networkcode" label="网点代码" center ></el-table-column>
        <el-table-column prop="networkname" label="网点名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination small @size-change="netSizeChange" @current-change='netCurrentChange' :current-page.sync="currentLog" :pager-count='5' :page-size='5' :page-sizes='netSize'  :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
      </div>
    </el-dialog>
    <!-- 获取业务员 -->
    <el-dialog title="归属业务员" :before-close='agentClose' :append-to-body='true' :visible.sync="agent_dialog" width="70%" center>
      <el-form class="agent_manage_form">
        <el-row >
          <el-col :span="12">
            <el-form-item>
              <ui-label-text label="业务员代码：" labelWidth="130" >
                <el-input slot="text" clearable v-model="agentData.agenCode" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <ui-label-text label="业务员名称：" labelWidth="130" >
                <el-input slot="text"  clearable v-model="agentData.agenName" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item>
              <ui-label-text label="归属机构代码：" labelWidth="130" >
                <el-input slot="text"  clearable v-model="agentData.comCode" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <ui-label-text label="归属机构代码名称：" labelWidth="130" >
              <el-input slot="text"  v-model="agentData.comName" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center; margin-bottom: 20px; "><el-button type="primary" @click.native.prevent="getAgentList(1)" >查询</el-button></div>
      <el-table @row-click='selectRowAgent' ref="multipleTable" :data="agentListData">
        <el-table-column prop="agentCode" label="归属业务员代码" center ></el-table-column>
        <el-table-column prop="agentName" label="归属业务员名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="agentSizeChange" small @current-change='agentCurrentChange' :current-page.sync="agentData.currentPage" :pager-count='5' :page-size='5' :page-sizes='agentSize'  :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import { getUserId } from '@/utils/cookie'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      searchData: {
        comCode: '',
        comName: '',
        bankChannelCode: '',
        bankChannelName: '',
        networkCode: '',
        networkName: '',
        agenCode: '',
        agenName: '',
        createDateStart: '',
        createDateEnd: ''
      }, // 查询条件
      radio: '',
      timer: '', // 日期
      isInput: false, // 输入框禁用
      isInputPeo: true, // 输入框禁用
      isShowTable: false, // 是否显示查询结果
      agentTableData: [], // 查询结果
      current: 1, // 当前页码
      currentLog: 1, // 弹框当前页码
      seaTotalRecords: 0, // 总条数
      seaTotalPages: 0, // 总页数
      totalRecords: 0, // 总条数
      totalPages: 0, // 总页数
      pageSize: 5,
      comPageSize: 5,
      comSize: [], // 保险公司分页
      bankSize: [],
      agentPageSize: 5, // 显示条数
      agentSize: [5, 10, 20, 50], // 业务员分页条数
      bankPageSize: 5,
      netPageSize: 5, // 显示条数
      netSize: [5, 10, 20, 50], // 业务员分页条数
      isAdd: false, // 是否显示添加弹框
      addData: {
        comcode: '',
        comname: '',
        bankchannelcode: '',
        bankchannelname: '',
        networkcode: '',
        networkname: '',
        agencode: '',
        agenname: '',
        createdate: ''
      }, // 添加数据
      rules: {
        comcode: [
          { required: true, message: '请输入保险公司代码', trigger: 'change' }
        ],
        comname: [
          { required: true, message: '请输入保险公司名称', trigger: 'change' }
        ],
        bankchannelcode: [
          { required: true, message: '请输入银行渠道代码', trigger: 'change' }
        ],
        bankchannelname: [
          { required: true, message: '请输入银行渠道名称', trigger: 'change' }
        ],
        networkcode: [
          { required: true, message: '请输入网点代码', trigger: 'change' }
        ],
        networkname: [
          { required: true, message: '请输入网点名称', trigger: 'change' }
        ],
        agencode: [
          { required: true, message: '请输入归属业务员代码', trigger: 'change' }
        ],
        agenname: [
          { required: true, message: '请输入归属业务员名称', trigger: 'change' }
        ],
        createdate: [
          { required: true, message: '请输入日期', trigger: 'change' }
        ]
      },
      isModify: false, // 是否显示添加弹框
      modifyData: {
        comcode: '',
        comname: '',
        bankchannelcode: '',
        bankchannelname: '',
        networkcode: '',
        networkname: '',
        agencode: '',
        agenname: '',
        createdate: ''
      }, // 修改数据
      isImport: false, // 是否显示导入
      selectItem: [], // 勾选条目
      fileList: [],
      com_dialog: false, // 是否显示保险公司弹框
      insComTableData: [], // 保险公司数据
      tableData: [], // 弹框数据
      postData: {}, // 获取弹框条件
      bank_dialog: false, // 是否显示银行渠道
      isModule: '', // 判断什么地方调用查询弹框 0查询 1添加 2修改
      isTag: '', // 判断什么地方调用查询弹框 0查询 1添加 2修改
      netTableData: [], // 网点数据
      net_dialog: false, // 是否显示网点弹框
      isNet: '', // 判断什么地方调用查询弹框 0查询 1添加 2修改
      detailData: {},
      isDetail: false,
      agentData: {}, // 查询业务员
      agentListData: [],
      agent_dialog: false,
      isAgent: '',
      loading: '',
      limt: {
        add: false,
        modify: false,
        review: false,
        query: false,
        export: false,
        import: false
      },
      postListData: {}
    }
  },
  mounted () {
    this.$nextTick(function () {
      // 初始化数据
      this.radio = '1' // 默认填按网点
      this.agentData.currentPage = 1
    })
    this.getBtnLimt()
  },
  computed: {
    newComCode () {
      return this.searchData.comCode
    },
    newComName () {
      return this.searchData.comName
    }
  },
  watch: {
    newComCode (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.comCode = ''
        this.searchData.comName = ''
      }
    },
    newComName (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.comCode = ''
        this.searchData.comName = ''
      }
    },
    'searchData.bankChannelCode' (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.bankChannelName = ''
      }
    },
    'searchData.bankChannelName' (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.bankChannelCode = ''
      }
    },
    'searchData.networkCode' (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.networkName = ''
      }
    },
    'searchData.networkName' (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.networkCode = ''
      }
    },
    'searchData.agenCode' (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.agenName = ''
      }
    },
    'searchData.agenName' (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.agenCode = ''
      }
    },
    'addData.comcode' (newValue, oldValue) {
      if (newValue === '') {
        this.addData.comname = ''
      }
    },
    'addData.comname' (newValue, oldValue) {
      if (newValue === '') {
        this.addData.comcode = ''
      }
    },
    'addData.bankchannelcode' (newValue, oldValue) {
      if (newValue === '') {
        this.addData.bankchannelname = ''
      }
    },
    'addData.bankchannelname' (newValue, oldValue) {
      if (newValue === '') {
        this.addData.bankchannelcode = ''
      }
    },
    'addData.agencode' (newValue, oldValue) {
      if (newValue === '') {
        this.addData.agenname = ''
      }
    },
    'addData.agenname' (newValue, oldValue) {
      if (newValue === '') {
        this.addData.agencode = ''
      }
    },
    'modifyData.comcode' (newValue, oldValue) {
      if (newValue === '') {
        this.modifyData.comname = ''
      }
    },
    'modifyData.comname' (newValue, oldValue) {
      if (newValue === '') {
        this.modifyData.comcode = ''
      }
    },
    'modifyData.bankchannelcode' (newValue, oldValue) {
      if (newValue === '') {
        this.modifyData.bankchannelname = ''
      }
    },
    'modifyData.bankchannelname' (newValue, oldValue) {
      if (newValue === '') {
        this.modifyData.bankchannelcode = ''
      }
    },
    'modifyData.agencode' (newValue, oldValue) {
      if (newValue === '') {
        this.modifyData.agenname = ''
      }
    },
    'modifyData.agenname' (newValue, oldValue) {
      if (newValue === '') {
        this.modifyData.agencode = ''
      }
    }
  },
  methods: {
    getBtnLimt () { // 按钮权限
      let userId = getUserId()
      if (userId === null || userId === undefined) {
        userId = ''
      }
      let post = {
        'userId': userId,
        'page': '银保代理人员匹配管理'
      }
      this.getBtnLimt_Agent(post).then(resp => {
        if (resp.code === '000000') {
          resp.data.forEach((item, index) => {
            this.limt[item.code] = item.checked
          })
        }
      })
    },
    radioChange (val) { // 单选改变时
      this.searchData = {
        comCode: '',
        comName: '',
        bankChannelCode: '',
        bankChannelName: '',
        networkCode: '',
        networkName: '',
        agenCode: '',
        agenName: ''
      }
      if (val === '1') { // 按网点
        this.isInput = false
        this.isInputPeo = true
      } else {
        this.isInputPeo = false
        this.isInput = true
      }
    },
    searchAgent (page) { // 查询
      this.current = page
      this.searchData.pageSize = this.pageSize
      if (this.timer !== null || this.timer === '') {
        this.searchData.createDateStart = this.timer[0]
        this.searchData.createDateEnd = this.timer[1]
      } else {
        this.searchData.createDateStart = ''
        this.searchData.createDateEnd = ''
      }
      this.searchData.currentPage = page
      this.postListData = JSON.parse(JSON.stringify(this.searchData))
      this.postAgent(this.postListData)
    },
    postAgent (post) {
      this.Loading()
      this.searchBusPeople(post).then(resp => {
        this.closeLoading()
        if (resp.content.length > 0) {
          this.agentTableData = resp.content
          this.agentTableData.forEach((item, index) => {
            let time = item.createdate.split(' ')
            this.$set(item, 'time', time[0])
          })
          this.seaTotalPages = resp.totalPages
          this.seaTotalRecords = resp.totalElements
        } else {
          this.agentTableData = []
          this.seaTotalPages = 0
          this.seaTotalRecords = 0
        }
        this.isShowTable = true
      }).catch(() => {
        // this.open('error', '系统错误，请刷新重试！')
        this.closeLoading()
      })
    },
    handleSelectionChange (row) { // table勾选
      this.selectItem = row
    },
    handleCurrentChange (val) { // 查询翻页
      this.current = val
      this.postListData.currentPage = val
      this.postAgent(this.postListData)
    },
    handleSizeChange (val) { // 请求条数改变
      this.pageSize = val
      this.current = 1
      this.postListData.currentPage = 1
      this.postListData.pageSize = this.pageSize
      this.postAgent(this.postListData)
    },
    closeAdd () {
      this.$refs['addData'].resetFields()
      this.isAdd = false
    },
    addPut () { // 新增提交
      this.$refs['addData'].validate((valid) => {
        if (valid) {
          this.Loading()
          this.addPeople(this.addData).then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.isAdd = false
              this.addData = {}
              this.$refs.addData.resetFields()
              this.open('success', resp.msg)
            } else {
              this.open('error', resp.msg)
            }
          }).catch(() => {
            this.open('error', '系统错误，请刷新重试！')
            this.closeLoading()
          })
        } else {
          return false
        }
      })
    },
    modify () { // 修改保险机构
      if (this.selectItem.length === 1) {
        this.detailMesg({'autoId': this.selectItem[0].autoid}).then(resp => {
          this.modifyData = resp
          this.isModify = true
        })
      } else {
        if (this.selectItem.length > 1) {
          this.openMseg('error', '只能勾选一条记录！')
        } else {
          this.openMseg('error', '请先勾选记录！')
        }
      }
    },
    modifyPut () { // 提交修改
      this.$refs['modifyData'].validate((valid) => {
        if (valid) {
          this.Loading()
          this.modifyPeople(this.modifyData).then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.isModify = false
              this.modifyData = {}
              this.open('success', resp.msg)
            } else {
              this.open('error', resp.msg)
            }
          }).catch(() => {
            this.open('error', '系统错误，请刷新重试！')
            this.closeLoading()
          })
        } else {
          return false
        }
      })
    },
    uploadUrl () { // 上传地址
      return '/tabycore/bank/matchImport'
    },
    handleEXLSuccess (response) { // 上传成功回调
      if (response.code === '000000') {
        this.openMseg('success', '上传成功！')
        this.isImport = false
        this.fileList = []
      } else {
        this.fileList = []
        this.openMseg('error', response.msg)
      }
    },
    downTemp () { // 下载模板
      window.open('/tabycore/bank/downloadModel')
    },
    openMseg (types, mesg) { // 提示
      this.$message({
        message: mesg,
        type: types
      })
    },
    outImport () { // 导出
      if (this.searchData.createDateStart === undefined) {
        this.searchData.createDateStart = ''
      }
      if (this.searchData.createDateEnd === undefined) {
        this.searchData.createDateEnd = ''
      }
      window.open(`/tabycore/bank/matchExport?comCode=${this.searchData.comCode}&comName=${this.searchData.comName}&bankChannelCode=${this.searchData.bankChannelCode}&bankChannelName=${this.searchData.bankChannelName}&networkCode=${this.searchData.networkCode}&networkName=${this.searchData.networkName}&agenCode=${this.searchData.agenCode}&agenName=${this.searchData.agenName}&createDateStart=${this.searchData.createDateStart}&createDateEnd=${this.searchData.createDateEnd}`)
    },
    getComInfo (page, type) { // 获取保险公司
      this.comSize = [5, 10, 20, 50]
      this.isModule = type
      var Code = ''
      var Name = ''
      if (this.isModule === 0) { // 查询
        Code = this.searchData.comCode
        Name = this.searchData.comName
      } else if (this.isModule === 1) { // 添加查询
        Code = this.addData.comcode
        Name = this.addData.comname
      } else if (this.isModule === 2) { // 修改查询
        Code = this.modifyData.comcode
        Name = this.modifyData.comname
      }
      this.currentLog = page
      var data = {
        'insurerCode': Code,
        'insurerName': Name,
        'currentPage': page,
        'pageSize': this.comPageSize,
        'insurerType': '3',
        'codeType': 'getCom',
        'clickType': '2'
      }
      this.getDalogMesg(data).then(resp => {
        this.com_dialog = true
        this.insComTableData = resp.content
        this.totalRecords = resp.totalRecords
        this.totalPages = resp.totalPages
      })
    },
    blurCom (tag, type, event) { // 失去焦点判断
      this.isModule = tag
      if (this.com_dialog || event.target.value === '') {
        return false
      }
      let Code = ''
      let Name = ''
      if (this.isModule === 0) { // 查询
        Code = this.searchData.comCode
        Name = this.searchData.comName
      } else if (this.isModule === 1) { // 添加查询
        Code = this.addData.comcode
        Name = this.addData.comname
      } else if (this.isModule === 2) { // 修改查询
        Code = this.modifyData.comcode
        Name = this.modifyData.comname
      }
      if (type === 0) {
        Name = ''
      } else {
        Code = ''
      }
      var data = {
        'insurerCode': Code,
        'insurerName': Name,
        'insurerType': '3',
        'codeType': 'getCom',
        'clickType': '1'
      }
      this.getDalogMesg(data).then(resp => {
        if (resp.content.length > 0) {
          if (this.isModule === 0) { // 查询
            this.searchData.comCode = resp.content[0].insurercode
            this.searchData.comName = resp.content[0].insurername
          } else if (this.isModule === 1) { // 添加查询
            this.addData.comcode = resp.content[0].insurercode
            this.addData.comname = resp.content[0].insurername
          } else if (this.isModule === 2) { // 修改查询
            this.modifyData.comcode = resp.content[0].insurercode
            this.modifyData.comname = resp.content[0].insurername
          }
        } else {
          if (this.isModule === 0) { // 查询
            this.searchData.comCode = ''
            this.searchData.comName = ''
          } else if (this.isModule === 1) { // 添加查询
            this.addData.comcode = ''
            this.addData.comname = ''
          } else if (this.isModule === 2) { // 修改查询
            this.modifyData.comcode = ''
            this.modifyData.comname = ''
          }
          this.open('error', '代码或名称不存在')
        }
      })
    },
    closeDailog () {
      return new Promise((resolve, reject) => {
        this.com_dialog = false
        this.bank_dialog = false
        this.agent_dialog = false
        this.net_dialog = false
        resolve()
      })
    },
    selectRowCom (row) { // 保险公司选择
      this.closeDailog().then(() => {
        row = JSON.parse(JSON.stringify(row))
        if (this.isModule === 0) { // 查询
          this.searchData.comCode = row.insurercode
          this.searchData.comName = row.insurername
        } else if (this.isModule === 1) { // 添加查询
          this.addData.comcode = row.insurercode
          this.addData.comname = row.insurername
        } else if (this.isModule === 2) { // 修改查询
          this.modifyData.comcode = row.insurercode
          this.modifyData.comname = row.insurername
        }
      })
    },
    comCurrentChange (val) { // 选择保险公司分页
      this.getComInfo(val, this.isModule)
    },
    comSizeChange (val) {
      this.comPageSize = val
      this.getComInfo(1, this.isModule)
    },
    closeCom () {
      this.comSize = []
      this.comPageSize = 5
      this.com_dialog = false
      if (this.isModule === 0) { // 查询
        this.searchData.comCode = ''
        this.searchData.comName = ''
      } else if (this.isModule === 1) { // 添加查询
        this.addData.comcode = ''
        this.addData.comname = ''
      } else if (this.isModule === 2) { // 修改查询
        this.modifyData.comcode = ''
        this.modifyData.comname = ''
      }
    },
    closeBlank () { // 银行弹框关闭
      this.bankSize = []
      this.bankPageSize = 5
      this.bank_dialog = false
      if (this.isTag === 0) { // 查询
        this.searchData.bankChannelCode = ''
        this.searchData.bankChannelName = ''
      } else if (this.isTag === 1) { // 添加查询
        this.addData.bankchannelcode = ''
        this.addData.bankchannelname = ''
      } else if (this.isTag === 2) { // 修改查询
        this.modifyData.bankchannelcode = ''
        this.modifyData.bankchannelname = ''
      }
    },
    agentClose () { // 业务员关闭
      this.agentSize = []
      this.agentPageSize = 5
      this.agent_dialog = false
      this.agentData = {}
      if (this.isAgent === 0) { // 查询
        this.searchData.agenCode = ''
        this.searchData.agenName = ''
      } else if (this.isAgent === 1) { // 添加查询
        this.addData.agencode = ''
        this.addData.agenname = ''
      } else if (this.isAgent === 2) { // 修改查询
        this.modifyData.agencode = ''
        this.modifyData.agenname = ''
      }
    },
    getInfoBank (page, type, tag) { // 获取银行渠道
      this.isTag = tag
      var code = ''
      var name = ''
      this.bankSize = [5, 10, 20, 50]
      if (this.isTag === 0) { // 查询
        code = this.searchData.bankChannelCode
        name = this.searchData.bankChannelName
      } else if (this.isTag === 1) { // 添加查询
        code = this.addData.bankchannelcode
        name = this.addData.bankchannelname
      } else if (this.isTag === 2) { // 修改查询
        code = this.modifyData.bankchannelcode
        name = this.modifyData.bankchannelname
      }
      this.currentLog = page
      this.postData.codeType = type
      this.postData.currentPage = page
      this.postData.pageSize = this.bankPageSize
      this.postData.bankChannelCode = code
      this.postData.bankChannelName = name
      this.postData.clickType = '2'
      this.getDalogMesg(this.postData).then(resp => {
        this.tableData = []
        this.tableData = resp.content
        this.totalPages = resp.totalPages
        this.totalRecords = resp.totalElements
        this.bank_dialog = true
      })
    },
    selectRow (row) { // 选择银行渠道
      this.closeDailog().then(() => {
        row = JSON.parse(JSON.stringify(row))
        if (this.isTag === 0) { // 查询
          this.searchData.bankChannelCode = row.bankcode
          this.searchData.bankChannelName = row.bankname
        } else if (this.isTag === 1) { // 添加查询
          this.addData.bankchannelcode = row.bankcode
          this.addData.bankchannelname = row.bankname
        } else if (this.isTag === 2) { // 修改查询
          this.modifyData.bankchannelcode = row.bankcode
          this.modifyData.bankchannelname = row.bankname
        }
        this.bank_dialog = false
      })
    },
    bankCurrentChange (val) { // 弹框分页
      this.getInfoBank(val, 'getChannel', this.isTag)
    },
    bankSizeChange (val) {
      this.bankPageSize = val
      this.getInfoBank(1, 'getChannel', this.isTag)
    },
    blurBank (tag, type, event) { // 失去焦点判断
      this.isTag = tag
      if (this.bank_dialog || event.target.value === '') {
        return false
      }
      var codeA = ''
      var codeB = ''
      if (this.isTag === 0) { // 查询
        codeB = this.searchData.bankChannelCode
        codeA = this.searchData.bankChannelName
      } else if (this.isTag === 1) { // 添加查询
        codeB = this.addData.bankchannelcode
        codeA = this.addData.bankchannelname
      } else if (this.isTag === 2) { // 修改查询
        codeB = this.modifyData.bankchannelcode
        codeA = this.modifyData.bankchannelname
      }
      if (type === 0) {
        codeA = ''
      } else {
        codeB = ''
      }
      this.postData.codeType = 'getChannel'
      this.postData.currentPage = 1
      this.postData.pageSize = 5
      this.postData.bankChannelCode = codeB
      this.postData.bankChannelName = codeA
      this.postData.clickType = '1'
      this.getDalogMesg(this.postData).then(resp => {
        if (resp.content.length > 0) {
          if (this.isTag === 0) { // 查询
            this.searchData.bankChannelCode = resp.content[0].bankcode
            this.searchData.bankChannelName = resp.content[0].bankname
          } else if (this.isTag === 1) { // 添加查询
            this.addData.bankchannelcode = resp.content[0].bankcode
            this.addData.bankchannelname = resp.content[0].bankname
          } else if (this.isTag === 2) { // 修改查询
            this.modifyData.bankchannelcode = resp.content[0].bankcode
            this.modifyData.bankchannelname = resp.content[0].bankname
          }
        } else {
          if (this.isTag === 0) { // 查询
            this.searchData.bankChannelCode = ''
            this.searchData.bankChannelName = ''
          } else if (this.isTag === 1) { // 添加查询
            this.addData.bankchannelcode = ''
            this.addData.bankchannelname = ''
          } else if (this.isTag === 2) { // 修改查询
            this.modifyData.bankchannelcode = ''
            this.modifyData.bankchannelname = ''
          }
          this.open('error', '代码或名称不存在')
        }
      })
    },
    getInfoNet (page, type, tag) { // 获取网点信息
      this.isNet = tag
      this.postData = {}
      this.netSize = [5, 10, 20, 50]
      var netcode = ''
      var netname = ''
      this.postData.bankChannelCode = ''
      this.postData.bankChannelName = ''
      if (this.isNet === 0) { // 查询
        netcode = this.searchData.networkCode
        netname = this.searchData.networkName
        this.postData.bankChannelCode = this.searchData.bankChannelCode
        this.postData.bankChannelName = this.searchData.bankChannelName
      } else if (this.isNet === 1) { // 添加查询
        netcode = this.addData.networkcode
        netname = this.addData.networkname
      } else if (this.isNet === 2) { // 修改查询
        netcode = this.modifyData.networkcode
        netname = this.modifyData.networkname
      }
      this.currentLog = page
      this.postData.codeType = type
      this.postData.currentPage = page
      this.postData.pageSize = this.netPageSize
      this.postData.networkCode = netcode
      this.postData.networkName = netname
      this.postData.clickType = '2'
      this.getDalogMesg(this.postData).then(resp => {
        this.netTableData = resp.content
        this.totalPages = resp.totalPages
        this.totalRecords = resp.totalElements
      })
      this.net_dialog = true
    },
    blurNet (tag, type) { // 失去焦点判断
      this.isNet = tag
      if (this.net_dialog) {
        return false
      }
      var netcode = ''
      var netname = ''
      if (this.isNet === 0) { // 查询
        netcode = this.searchData.networkCode
        netname = this.searchData.networkName
      } else if (this.isNet === 1) { // 添加查询
        netcode = this.addData.networkcode
        netname = this.addData.networkname
      } else if (this.isNet === 2) { // 修改查询
        netcode = this.modifyData.networkcode
        netname = this.modifyData.networkname
      }
      if (type === 0) {
        netname = ''
      } else {
        netcode = ''
      }
      var data = {
        'networkCode': netcode,
        'networkName': netname,
        'bankChannelCode': this.searchData.bankChannelCode,
        'bankChannelName': this.searchData.bankChannelName,
        'codeType': 'getNetwork',
        'clickType': '1'
      }
      this.getDalogMesg(data).then(resp => {
        if (resp.content.length > 0) {
          if (this.isNet === 0) { // 查询
            this.searchData.bankChannelCode = resp.content[0].bankchannelcode
            this.searchData.bankChannelName = resp.content[0].bankchannelname
            this.searchData.networkCode = resp.content[0].networkcode
            this.searchData.networkName = resp.content[0].networkname
          } else if (this.isNet === 1) { // 添加查询
            this.addData.bankchannelcode = resp.content[0].bankchannelcode
            this.addData.bankchannelname = resp.content[0].bankchannelname
            this.addData.networkcode = resp.content[0].networkcode
            this.addData.networkname = resp.content[0].networkname
          } else if (this.isNet === 2) { // 修改查询
            this.modifyData.bankchannelcode = resp.content[0].bankchannelcode
            this.modifyData.bankchannelname = resp.content[0].bankchannelname
            this.modifyData.networkcode = resp.content[0].networkcode
            this.modifyData.networkname = resp.content[0].networkname
          }
        } else {
          if (this.isNet === 0) { // 查询
            this.searchData.networkCode = ''
            this.searchData.networkName = ''
          } else if (this.isNet === 1) { // 添加查询
            this.addData.networkcode = ''
            this.addData.networkname = ''
          } else if (this.isNet === 2) { // 修改查询
            this.modifyData.networkcode = ''
            this.modifyData.networkname = ''
          }
          this.open('error', '代码或名称不存在')
        }
      })
    },
    selectRowNet (row) { // 选择网点
      this.closeDailog().then(() => {
        row = JSON.parse(JSON.stringify(row))
        console.log(this.isNet)
        if (this.isNet === 0) { // 查询
          this.searchData.bankChannelCode = row.bankchannelcode
          this.searchData.bankChannelName = row.bankchannelname
          this.searchData.networkCode = row.networkcode
          this.searchData.networkName = row.networkname
        } else if (this.isNet === 1) { // 添加查询
          this.addData.bankchannelcode = row.bankchannelcode
          this.addData.bankchannelname = row.bankchannelname
          this.addData.networkcode = row.networkcode
          this.addData.networkname = row.networkname
        } else if (this.isNet === 2) { // 修改查询
          this.modifyData.bankchannelcode = row.bankchannelcode
          this.modifyData.bankchannelname = row.bankchannelname
          this.modifyData.networkcode = row.networkcode
          this.modifyData.networkname = row.networkname
        }
        this.net_dialog = false
      })
    },
    closeNet () {
      this.netSize = []
      this.netPageSize = 5
      this.net_dialog = false
      this.searchData.networkCode = ''
      this.searchData.networkName = ''
    },
    netCurrentChange (val) { // 弹框分页
      this.getInfoNet(val, 'getNetwork', this.isNet)
    },
    netSizeChange (val) { // 弹框分页
      this.netPageSize = val
      this.getInfoNet(1, 'getNetwork', this.isTag)
    },
    detail (row) { // 获取详情
      this.Loading()
      this.detailMesg({'autoId': row.autoid}).then(resp => {
        this.closeLoading()
        this.detailData = resp
        this.isDetail = true
      }).catch(() => {
        this.open('error', '系统错误，请刷新重试！')
        this.closeLoading()
      })
    },
    getAgentList (page) { // 归属业务员查询
      this.agentData.codeType = 'getAgen'
      this.agentData.pageSize = this.agentPageSize
      this.agentData.currentPage = page
      this.agentData.clickType = '2'
      this.getDalogMesg(this.agentData).then(resp => {
        this.agentListData = resp.content
        this.totalPages = resp.totalPages
        this.totalRecords = resp.totalElements
      })
    },
    agentCurrentChange (val) { // 分页
      this.getAgentList(val)
    },
    agentSizeChange (val) {
      this.agentPageSize = val
      this.getAgentList(1)
    },
    getInfoAgent (page, type, tag) {
      this.isAgent = tag
      var agcode = ''
      var agname = ''
      this.agentData.currentPage = page
      this.agentSize = [5, 10, 20, 50]
      if (this.isAgent === 0) { // 查询
        agcode = this.searchData.agenCode
        agname = this.searchData.agenName
      } else if (this.isAgent === 1) { // 添加查询
        agcode = this.addData.agencode
        agname = this.addData.agenname
      } else if (this.isAgent === 2) { // 修改查询
        agcode = this.modifyData.agencode
        agname = this.modifyData.agenname
      }
      this.currentLog = page
      this.postData.codeType = 'getAgen'
      this.postData.currentPage = page
      this.postData.pageSize = this.agentPageSize
      this.postData.agenCode = agcode
      this.postData.agenName = agname
      this.postData.clickType = 2
      this.getDalogMesg(this.postData).then(resp => {
        this.agentListData = resp.content
        this.totalPages = resp.totalPages
        this.totalRecords = resp.totalElements
        this.agent_dialog = true
      })
    },
    selectRowAgent (row) {
      this.closeDailog().then(() => {
        row = JSON.parse(JSON.stringify(row))
        if (this.isAgent === 0) { // 查询
          this.searchData.agenCode = row.agentCode
          this.searchData.agenName = row.agentName
        } else if (this.isAgent === 1) { // 添加查询
          this.addData.agencode = row.agentCode
          this.addData.agenname = row.agentName
        } else if (this.isAgent === 2) { // 修改查询
          this.modifyData.agencode = row.agentCode
          this.modifyData.agenname = row.agentName
        }
        this.agent_dialog = false
      })
    },
    blurAgent (tag, type, event) {
      this.isAgent = tag
      var codeC = ''
      var codeN = ''
      if (this.agent_dialog || event.target.value === '') {
        return false
      }
      if (this.isAgent === 0) { // 查询
        codeC = this.searchData.agenCode
        codeN = this.searchData.agenName
      } else if (this.isAgent === 1) { // 添加查询
        codeC = this.addData.agencode
        codeN = this.addData.agentname
      } else if (this.isAgent === 2) { // 修改查询
        codeC = this.modifyData.agencode
        codeN = this.modifyData.agentname
      }
      console.log(type)
      if (type === 0) {
        codeN = ''
      } else {
        codeC = ''
      }
      this.postData.codeType = 'getAgen'
      this.postData.currentPage = 1
      this.postData.pageSize = 5
      this.postData.agenCode = codeC
      this.postData.agenName = codeN
      this.postData.clickType = 1
      this.getDalogMesg(this.postData).then(resp => {
        if (resp.content.length > 0) {
          if (this.isAgent === 0) { // 查询
            this.searchData.agenCode = resp.content[0].agentCode
            this.searchData.agenName = resp.content[0].agentName
          } else if (this.isAgent === 1) { // 添加查询
            this.addData.agencode = resp.content[0].agentCode
            this.addData.agenname = resp.content[0].agentName
          } else if (this.isAgent === 2) { // 修改查询
            this.modifyData.agencode = resp.content[0].agentCode
            this.modifyData.agenname = resp.content[0].agentName
          }
        } else {
          if (this.isAgent === 0) { // 查询
            this.searchData.agenCode = ''
            this.searchData.agenName = ''
          } else if (this.isAgent === 1) { // 添加查询
            this.addData.agencode = ''
            this.addData.agenname = ''
          } else if (this.isAgent === 2) { // 修改查询
            this.modifyData.agencode = ''
            this.modifyData.agenname = ''
            this.modifyData.createdate = ''
          }
          this.open('error', '代码或名称不存在')
        }
      })
    },
    closeLoad () {
      this.fileList = []
      this.isImport = false
    },
    Loading () {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.6)'
      })
    },
    closeLoading () {
      this.loading.close()
    },
    open (type, mesg) { // 提示
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    ...mapActions([
      'searchBusPeople',
      'addPeople',
      'modifyPeople',
      'outImportMesg',
      'getDalogMesg',
      'getSilverInsCom',
      'detailMesg',
      'getBtnLimt_Agent'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
#agent_manage{
  padding: 0px 30px 30px 30px;
}
.agent_manage_form { padding-top: 20px; }
.ri-line { margin-bottom: 10px; }
.upLoad { text-align: center; }
.download { margin-bottom: 10px; text-align: center; }
a { text-decoration: none; }
</style>
<style>
  .btn-container { text-align: center; margin: 30px 0; }
  .el-date-editor .el-range__icon, .el-date-editor .el-range-separator { height: auto;}
  .pagination {
    text-align: right;
    margin: 20px auto;
  }
  .mesg_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
  }
  .el-input__icon { height: initial; line-height: inherit; }
  .mesg_form .el-form-item__error { left: 150px;}
  .mod_form .el-form-item__error { left: 150px;}
</style>

