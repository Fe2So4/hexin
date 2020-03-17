<template>
	<div id="billSearch">
		<ui-notice-bar slot="breadcast">
			<el-breadcrumb slot="location" separator=">">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
				<el-breadcrumb-item>寿险续期保单管理</el-breadcrumb-item>
				<el-breadcrumb-item>续期保单修改超级权限</el-breadcrumb-item>
			</el-breadcrumb>
		</ui-notice-bar>

		<!-- 查询 -->
		<el-form class="manage_form">
			<el-row>
				<el-col :span="12">
					<el-form-item>
						<ui-label-text label="保单号：" labelWidth="120">
							<el-input clearable slot="text" v-model="searchData.policyNo"></el-input>
						</ui-label-text>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item>
						<ui-label-text label="投保人代码：" labelWidth="120">
							<el-input clearable slot="text" v-model="searchData.insureNo"></el-input>
						</ui-label-text>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item>
						<ui-label-text label="投保人名称：" labelWidth="120">
							<el-input clearable slot="text" v-model="searchData.insureName"></el-input>
						</ui-label-text>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item>
						<ui-label-text label="投保人证件号：" labelWidth="120">
							<el-input clearable slot="text" v-model="searchData.identifyNumber"></el-input>
						</ui-label-text>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item>
						<ui-label-text label="被保险人代码：" labelWidth="120">
							<el-input clearable slot="text" v-model="searchData.insureNoD"></el-input>
						</ui-label-text>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item>
						<ui-label-text label="被保险人名称：" labelWidth="120">
							<el-input clearable slot="text" v-model="searchData.insureNameD"></el-input>
						</ui-label-text>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item>
						<ui-label-text label="被保险人证件号：" labelWidth="120">
							<el-input clearable slot="text" v-model="searchData.identifyNumberD"></el-input>
						</ui-label-text>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class='btn-container'>
			<el-button type="primary" @click.native.prevent="searchBill(1)">查询</el-button>
		</div>

		<!-- 查询结果 -->

		<el-table ref="multipleTable" border :data="searchResult" v-if='isShowTable' tooltip-effect="dark" style="width: 100%;"
		 stripe>
			<el-table-column prop="policyNo" label="保单号" width="150px;">
				<template slot-scope="scope">
					<a href="javascript:void(0)" @click="detailPolicyNo(scope.row)">{{scope.row.policyNo}}</a>
				</template>
			</el-table-column>
			<el-table-column prop="handlerName" label="业务员姓名" width="150px;">
				<template slot-scope="scope">
					<a href="javascript:void(0)" @click="detailAgentNo(scope.row)">{{scope.row.handlerName}}</a>
				</template>
			</el-table-column>
			<el-table-column prop="agentTypeName" label="服务人员名称" width="150px;"></el-table-column>
			<el-table-column prop="insureName" label="投保人名称" width="150px;">
				<template slot-scope="scope">
					<a href="javascript:void(0)" @click="detailApplicant(scope.row)">{{scope.row.insureName}}</a>
				</template>
			</el-table-column>
			<el-table-column prop="insuredName" label="被保险人名称" width="150px;">
				<template slot-scope="scope">
					<a href="javascript:void(0)" @click="detailInsured(scope.row)">{{scope.row.insuredName}}</a>
				</template>
			</el-table-column>
			<el-table-column prop="companyName" label="所属保险公司名称" width="180px;"></el-table-column>
			<el-table-column prop="comName" label="机构名称" width="180px;"></el-table-column>
			<el-table-column prop="updateTime" label="更新时间" width="150px;"></el-table-column>
			<el-table-column prop="agentStatus" label="业务员状态" width="150px;">
				<template slot-scope="scope">
					{{ scope.row.agentStatus === '0' ?  '离职': '' }}
					{{ scope.row.agentStatus === '1' ?  '在职': '' }}
				</template>
			</el-table-column>
			<el-table-column prop="xqFlag2" label="续期" width="120">
				<template slot-scope="scope">
					<el-select size="mini" v-model="scope.row.xqFlag2" placeholder="请选择">
						<el-option label="1" value="1"></el-option>
						<el-option label="2" value="2"></el-option>
						<el-option label="3" value="3"></el-option>
						<el-option label="4" value="4"></el-option>
						<el-option label="5" value="5"></el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" size='mini' @click='detailXq(scope.row)'>修改</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 查询分页 -->

		<div class="pagination" v-if='isShowTable'>
			<el-pagination @size-change="searchSizeChange" @current-change='handleCurrentChange' :current-page.sync="current"
			 :pager-count='5' :page-size='5' :page-sizes='[5, 10, 20, 50]' :total="totalRecords" layout="total, sizes, prev, pager, next, jumper"
			 :page-count="totalPages"></el-pagination>
		</div>

		<!-- 保单号弹框 -->

		<el-dialog :append-to-body='true' center width='70%' title="保单详情" :visible.sync="isBillNo">
			<el-form class="mesg_form">
				<!-- 基本信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>基本信息
					</span>
					<div class="ri-content" slot="content">
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保单号：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.proposalNo"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="保单号：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.policyNo"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="保单状态：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.baseMesg.policyStatus">
											<el-option label="失效" value="0"></el-option>
											<el-option label="未承保" value="1"></el-option>
											<el-option label="有效" value="2"></el-option>
											<el-option label="拒保" value="3"></el-option>
											<el-option label="退保" value="4"></el-option>
											<el-option label="犹退" value="5"></el-option>
											<el-option label="失效" value="6"></el-option>
											<el-option label="永久失效" value="7"></el-option>
											<el-option label="理赔中" value="8"></el-option>
											<el-option label="理赔终止" value="9"></el-option>
											<el-option label="减额交清" value="10"></el-option>
											<el-option label="交清" value="11"></el-option>
											<el-option label="冻结" value="12"></el-option>
											<el-option label="保单终止" value="13"></el-option>
											<el-option label="死亡理赔" value="14"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保日期：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.proposalDate"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="承保日期：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.acceptDate"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="生效日期：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.generateDate"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="缴至日期：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.jzDate"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="保单年度：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.bdYear"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="归属保险公司代码：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.companyCode"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="归属保险公司名称：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.baseMesg.companyName"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="归属保险公司机构代码：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.baseMesg.companyComCode"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="归属保险公司机构名称：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.baseMesg.companyComName"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="新/续期标记：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.baseMesg.insuranceMark">
											<el-option label="新保" value="1"></el-option>
											<el-option label="续保" value="2"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="是否续保：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.baseMesg.atuoAcceptFlag">
											<el-option label="是" value="1"></el-option>
											<el-option label="否" value="0"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="出单渠道：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.baseMesg.businessNature">
											<el-option label="百盈销售" value="1"></el-option>
											<el-option label="富新财富" value="2"></el-option>
											<el-option label="其他" value="3"></el-option>
											<el-option label="同道" value="4"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="业务类型：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.baseMesg.busiType">
											<el-option label="直接业务" value="1"></el-option>
											<el-option label="间接业务" value="2"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="现金价值自动垫缴保费：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.baseMesg.xjjzzddjbf">
											<el-option label="是" value="1"></el-option>
											<el-option label="否" value="0"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="账户价值自动抵交保费：" labelWidth="160">
										<el-select disabled slot="text" v-model="BillNoList.baseMesg.xjjzdjbff">
											<el-option label="是" value="1"></el-option>
											<el-option label="否" value="0"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="红利领取方式：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.baseMesg.hllqfs">
											<el-option label="累积生息" value="1"></el-option>
											<el-option label="抵缴保费" value="2"></el-option>
											<el-option label="增额交清" value="3"></el-option>
											<el-option label="转万能账户" value="4"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="年金领取方式：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.baseMesg.njlqfs">
											<el-option label="累积生息" value="1"></el-option>
											<el-option label="抵缴保费" value="2"></el-option>
											<el-option label="增额交清" value="3"></el-option>
											<el-option label="转万能账户" value="4"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="特别约定：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.baseMesg.speAgreement"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="回执签收日期：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.baseMesg.backMsgSignDate"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="回访状态：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.baseMesg.hfStatus">
											<el-option label="未回访" value="1"></el-option>
											<el-option label="成功" value="2"></el-option>
											<el-option label="失败" value="3"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="回访日期：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.baseMesg.hfDate"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="自保件：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.baseMesg.byMyself">
											<el-option label="是" value="1"></el-option>
											<el-option label="否" value="0"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="出单方式：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.baseMesg.singleMode">
											<el-option label="同道" value="1"></el-option>
											<el-option label="微/电投" value="2"></el-option>
											<el-option label="纸质投保" value="3"></el-option>
											<el-option label="其他" value="4"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
				<!--投保人信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>投保人信息
					</span>
					<div class="ri-content" slot="content">
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保人代码：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.insureNo"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保人名称：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.insureName"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保人地址：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.insureAddress"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="邮政编码：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.postNo"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="性别：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.policyHolder.sexType" placeholder="请选择">
											<el-option label="男" value="0"></el-option>
											<el-option label="女" value="1"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="国籍：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.country"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="出生日期：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.birthDate"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="备注：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.remark"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="婚姻状况：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.policyHolder.marriage" placeholder="请选择">
											<el-option label="已婚" value="1"></el-option>
											<el-option label="未婚" value="2"></el-option>
											<el-option label="不明" value="3"></el-option>
											<el-option label="离异" value="4"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="学历：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.policyHolder.educationCode" placeholder="请选择">
											<el-option label="小学" value="1"></el-option>
											<el-option label="初中" value="2"></el-option>
											<el-option label="高中" value="3"></el-option>
											<el-option label="大专" value="4"></el-option>
											<el-option label="本科" value="5"></el-option>
											<el-option label="硕士" value="6"></el-option>
											<el-option label="博士" value="7"></el-option>
											<el-option label="其他" value="8"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="证件类型：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.policyHolder.identifyType" placeholder="请选择">
											<el-option label="身份证" value="1"></el-option>
											<el-option label="户口本" value="2"></el-option>
											<el-option label="军官证" value="3"></el-option>
											<el-option label="驾驶证" value="4"></el-option>
											<el-option label="护照" value="5"></el-option>
											<el-option label="港澳居民来往大陆通行证" value="6"></el-option>
											<el-option label="台湾居民来往大陆通行证" value="7"></el-option>
											<el-option label="其他" value="8"></el-option>
											<el-option label="出生医学证明" value="9"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="证件号码：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.identifyNumber"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="证件有效期：" labelWidth="160">
                    <el-input v-if="BillNoList.policyHolder.longFlag === 0||!(BillNoList.policyHolder.longFlag)" slot="text" :disabled='true' v-model="BillNoList.policyHolder.identifyValiddate"></el-input>
                    <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="固定电话：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.insureTel"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="移动电话：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.mobilePhone"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="工作单位：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.workingUnit"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="职业：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.job"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="E-mail：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.e_mail"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="微信号：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.weixin"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="经常居住地：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.habitualResidence"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="与被保险人关系：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillNoList.policyHolder.insuredrType" placeholder="请选择">
											<el-option label="本人" value="1"></el-option>
											<el-option label="配偶" value="2"></el-option>
											<el-option label="子女" value="3"></el-option>
											<el-option label="父母" value="4"></el-option>
											<el-option label="其他" value="5"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="关系名称：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillNoList.policyHolder.insuredrName"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
				<!-- 被保险人信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>被保险人信息
					</span>
					<div class="ri-content" slot="content">
						<div v-for="(item, index) in BillNoList.insuredList" :key='index' class='splice-line'>
							<el-row>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="被保险人代码：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.insureNoD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="被保险人名称：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.insureNameD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="被保险人地址：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.insureAddressD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="邮政编码：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.postNoD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="性别：" labelWidth="160">
											<el-select slot="text" disabled v-model="item.sexTypeD" placeholder="请选择">
												<el-option label="男" value="0"></el-option>
												<el-option label="女" value="1"></el-option>
											</el-select>
										</ui-label-text>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="国籍：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.countryD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="出生日期：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.birthDateD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="备注：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.remark"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="婚姻状况：" labelWidth="160">
											<el-select slot="text" disabled v-model="item.marriageD" placeholder="请选择">
												<el-option label="已婚" value="1"></el-option>
												<el-option label="未婚" value="2"></el-option>
												<el-option label="不明" value="3"></el-option>
												<el-option label="离异" value="4"></el-option>
											</el-select>
										</ui-label-text>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="学历：" labelWidth="160">
											<el-select slot="text" disabled v-model="item.educationCodeD" placeholder="请选择">
												<el-option label="小学" value="1"></el-option>
												<el-option label="初中" value="2"></el-option>
												<el-option label="高中" value="3"></el-option>
												<el-option label="大专" value="4"></el-option>
												<el-option label="本科" value="5"></el-option>
												<el-option label="硕士" value="6"></el-option>
												<el-option label="博士" value="7"></el-option>
												<el-option label="其他" value="8"></el-option>
											</el-select>
										</ui-label-text>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="证件类型：" labelWidth="160">
											<el-select slot="text" disabled v-model="item.identifyTypeD" placeholder="请选择">
												<el-option label="身份证" value="1"></el-option>
												<el-option label="户口本" value="2"></el-option>
												<el-option label="军官证" value="3"></el-option>
												<el-option label="驾驶证" value="4"></el-option>
												<el-option label="护照" value="5"></el-option>
												<el-option label="港澳居民来往大陆通行证" value="6"></el-option>
												<el-option label="台湾居民来往大陆通行证" value="7"></el-option>
												<el-option label="其他" value="8"></el-option>
												<el-option label="出生医学证明" value="9"></el-option>
											</el-select>
										</ui-label-text>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="证件号码：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.identifyNumberD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="证件有效期：" labelWidth="160">
                      <el-input v-if="item.longFlagD === 0||!(item.longFlagD)" slot="text" :disabled='true' v-model="item.identifyValiddateD"></el-input>
                      <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="固定电话：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.insureTelD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="移动电话：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="BillNoList.insuredList.mobilePhoneD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="工作单位：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.workingUnitD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="职业：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="BillNoList.insuredList.jobD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="E-mail：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.e_mailD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="微信号：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.weixinD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item>
										<ui-label-text label="经常居住地：" labelWidth="160">
											<el-input slot="text" :disabled='true' v-model="item.habitualResidenceD"></el-input>
										</ui-label-text>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
					</div>
				</ui-line-tittle>
				<!-- 身故受益人信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>身故受益人信息
					</span>
					<div class="ri-content" slot="content">
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text>
										<el-radio-group disabled slot="text" v-model="BillNoList.baseMesg.sgFlag">
											<el-radio :label="1">法定受益人</el-radio>
											<el-radio :label="2">指定受益人</el-radio>
										</el-radio-group>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<div v-if='BillNoList.baseMesg.sgFlag == 2'>
							<div class='tabShow splice-line' v-for='(item, index) in BillNoList.dieBeniftList'
						 :key='index'>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="姓名：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.partyName"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="证件类型：" labelWidth="160">
												<el-select disabled slot="text" v-model="item.identifyType" placeholder="请选择">
													<el-option label="身份证" value="1"></el-option>
													<el-option label="户口本" value="2"></el-option>
													<el-option label="军官证" value="3"></el-option>
													<el-option label="驾驶证" value="4"></el-option>
													<el-option label="护照" value="5"></el-option>
													<el-option label="港澳居民来往大陆通行证" value="6"></el-option>
													<el-option label="台湾居民来往大陆通行证" value="7"></el-option>
													<el-option label="其他" value="8"></el-option>
													<el-option label="出生医学证明" value="9"></el-option>
												</el-select>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="证件号码：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.identifyNumber"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="证件有效期：" labelWidth="160">
                        <el-input v-if="item.longFlag === 0||!(item.longFlag)" slot="text" :disabled='true' v-model="item.identifyValiddate"></el-input>
                        <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="性别：" labelWidth="160">
												<el-select disabled slot="text" v-model="item.sex" placeholder="请选择">
													<el-option label="男" value="0"></el-option>
													<el-option label="女" value="1"></el-option>
												</el-select>
											</ui-label-text>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="出生日期：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.birthdate"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="备注：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.remark"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="受益顺序：" labelWidth="160">
												<el-select disabled slot="text" v-model="item.beneficialOrder" placeholder="请选择">
													<el-option label="1" value="1"></el-option>
													<el-option label="2" value="2"></el-option>
													<el-option label="3" value="3"></el-option>
													<el-option label="4" value="4"></el-option>
													<el-option label="5" value="5"></el-option>
												</el-select>
											</ui-label-text>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="受益份额（%）：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.benefitShare"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="与被保险人关系：" labelWidth="160">
												<el-select disabled slot="text" v-model="item.insuredrType" placeholder="请选择">
													<el-option label="本人" value="1"></el-option>
													<el-option label="配偶" value="2"></el-option>
													<el-option label="子女" value="3"></el-option>
													<el-option label="父母" value="4"></el-option>
													<el-option label="其他" value="5"></el-option>
												</el-select>
											</ui-label-text>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="关系名称：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.insuredrName"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="联系方式：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.phone"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="经常居住地：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.habitualResidenc"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
						</div>
					</div>
				</ui-line-tittle>
				<!-- 生存受益人信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>生存受益人信息
					</span>
					<div class="ri-content" slot="content">
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text>
										<el-radio-group disabled slot="text" v-model="BillNoList.baseMesg.scFlag">
											<el-radio :label="1">投保人</el-radio>
											<el-radio :label="2">被保险人</el-radio>
											<el-radio :label="3">其他</el-radio>
										</el-radio-group>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<div v-if='BillNoList.baseMesg.scFlag == 3'>
							<div class='tabShow'  v-for='(item, index) in BillNoList.liveBeniftList'
							:key='index'>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="姓名：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.partyName"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="证件类型：" labelWidth="160">
												<el-select disabled slot="text" v-model="item.identifyType" placeholder="请选择">
													<el-option label="身份证" value="1"></el-option>
													<el-option label="户口本" value="2"></el-option>
													<el-option label="军官证" value="3"></el-option>
													<el-option label="驾驶证" value="4"></el-option>
													<el-option label="护照" value="5"></el-option>
													<el-option label="港澳居民来往大陆通行证" value="6"></el-option>
													<el-option label="台湾居民来往大陆通行证" value="7"></el-option>
													<el-option label="其他" value="8"></el-option>
													<el-option label="出生医学证明" value="9"></el-option>
												</el-select>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="证件号码：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.identifyNumber"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="证件有效期：" labelWidth="160">
                        <el-input v-if="item.longFlag === 0||!(item.longFlag)" slot="text" :disabled='true' v-model="item.identifyValiddate"></el-input>
                        <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="性别：" labelWidth="160">
												<el-select disabled slot="text" v-model="item.sex" placeholder="请选择">
													<el-option label="男" value="0"></el-option>
													<el-option label="女" value="1"></el-option>
												</el-select>
											</ui-label-text>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="出生日期：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.birthdate"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="备注：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.remark"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="受益顺序：" labelWidth="160">
												<el-select disabled slot="text" v-model="item.beneficialOrder" placeholder="请选择">
													<el-option label="1" value="1"></el-option>
													<el-option label="2" value="2"></el-option>
													<el-option label="3" value="3"></el-option>
													<el-option label="4" value="4"></el-option>
													<el-option label="5" value="5"></el-option>
												</el-select>
											</ui-label-text>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="受益份额（%）：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.benefitShare"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="与被保险人关系：" labelWidth="160">
												<el-select disabled slot="text" v-model="item.insuredrType" placeholder="请选择">
													<el-option label="本人" value="1"></el-option>
													<el-option label="配偶" value="2"></el-option>
													<el-option label="子女" value="3"></el-option>
													<el-option label="父母" value="4"></el-option>
													<el-option label="其他" value="5"></el-option>
												</el-select>
											</ui-label-text>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="关系名称：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.insuredrName"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="联系方式：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.phone"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item>
											<ui-label-text label="经常居住地：" labelWidth="160">
												<el-input :disabled="true" slot="text" v-model="item.habitualResidenc"></el-input>
											</ui-label-text>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
						</div>

					</div>
				</ui-line-tittle>
				<!-- 业务员信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>业务员信息
					</span>
					<div class="ri-content" slot="content">
						<el-row v-for="(item, index) in salesmanInfoList" :key="index">
							<el-col :span="12" v-for="(i, idx) in item" :key="idx">
								<el-form-item>
									<ui-label-text :label="i.label+':'" labelWidth="160">
										<el-input slot="text" disabled="" v-model="BillNoList.baseMesg[i.prop]"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
				<!-- 险种信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>险种信息
					</span>
					<div class="ri-content" slot="content">
						<el-table border :data="BillNoList.insureTypeList" style="width: 100%" stripe>
							<el-table-column prop="riskCode" label="险种代码" width="120"></el-table-column>
							<el-table-column prop="riskName" label="险种名称" width="200"></el-table-column>
							<el-table-column prop="mainFlag" label="主/附险标识" width="120">
								<template slot-scope="scope">
									<el-select disabled size='mini' v-model="scope.row.mainFlag" slot="text" placeholder="请选择">
										<el-option label="附加险" value="0"></el-option>
										<el-option label="主险" value="1"></el-option>
										<el-option label="主附/显" value="3"></el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="paymentPeriod" label="缴费年期" width="120">
								<template slot-scope="scope">
									<el-input slot="text" size='mini' :disabled="true" v-model="scope.row.paymentPeriod"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="payrate" label="缴费频率" width="120">
								<template slot-scope="scope">
									<el-select disabled size='mini' v-model="scope.row.payrate" slot="text" placeholder="请选择">
										<el-option label="天缴" value="0"></el-option>
										<el-option label="月缴" value="1"></el-option>
										<el-option label="季缴" value="2"></el-option>
										<el-option label="年缴" value="3"></el-option>
										<el-option label="趸缴" value="4"></el-option>
										<el-option label="半年缴" value="5"></el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="premium" label="应缴保费" width="120">
								<template slot-scope="scope">
									<el-input size='mini' :disabled='true' slot="text" v-model="scope.row.premium"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="riskPremium" label="保险金额" width="120">
								<template slot-scope="scope">
									<el-input size='mini' :disabled='true' slot="text" v-model="scope.row.riskPremium"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="number" label="份数" width="120">
								<template slot-scope="scope">
									<el-input size='mini' :disabled='true' slot="text" v-model="scope.row.number"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="addPremium" label="加费金额" width="120">
								<template slot-scope="scope">
									<el-input size='mini' :disabled='true' slot="text" v-model="scope.row.addPremium"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="tbrFreeFlag" label="豁免人" width="200">
								<template slot-scope="scope">
									<el-checkbox disabled size="mini" v-model="scope.row.tbrFreeFlag">投保人</el-checkbox>
									<el-checkbox disabled size='mini' v-model="scope.row.bbrFreeFlag">被保人</el-checkbox>
								</template>
							</el-table-column>
							<el-table-column prop="startDate" label="保险期间" width="160">
								<template slot-scope="scope">
									{{ scope.row.startDate}}至
									{{ scope.row.lifeFlag === true ? '' : scope.row.startDate }}
									<el-checkbox disabled size='mini' v-model="scope.row.lifeFlag">终身</el-checkbox>
								</template>
							</el-table-column>
							<el-table-column prop="riskStatus" label="险种状态" width="120">
								<template slot-scope="scope">
									{{ scope.row.riskStatus === '0' ?  '失效': '' }}
									{{ scope.row.riskStatus === '1' ?  '未承保': '' }}
									{{ scope.row.riskStatus === '2' ?  '有效': '' }}
									{{ scope.row.riskStatus === '3' ?  '拒保': '' }}
									{{ scope.row.riskStatus === '4' ?  '退保': '' }}
									{{ scope.row.riskStatus === '5' ?  '犹退': '' }}
									{{ scope.row.riskStatus === '6' ?  '失效': '' }}
									{{ scope.row.riskStatus === '7' ?  '永久失效': '' }}
									{{ scope.row.riskStatus === '8' ?  '理赔中': '' }}
									{{ scope.row.riskStatus === '9' ?  '理赔终止': '' }}
									{{ scope.row.riskStatus === '10' ?  '减额交清': '' }}
									{{ scope.row.riskStatus === '11' ?  '交清': '' }}
									{{ scope.row.riskStatus === '112' ?  '冻结': '' }}
									{{ scope.row.riskStatus === '13' ?  '到期终止': '' }}
									{{ scope.row.riskStatus === '14' ?  '死亡理赔': '' }}
								</template>
							</el-table-column>
						</el-table>
					</div>
				</ui-line-tittle>
				<!-- 缴费信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title" style="margin-top: 20px; ">
						<i class="font_family icon-jy-menu-4"></i>缴费信息
					</span>
					<div class="ri-content" slot="content">
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="应缴日期：" labelWidth="160">
										<el-date-picker disabled slot="text" v-model="BillNoList.payFeeList.paidDate" type="date" placeholder="选择日期"></el-date-picker>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="缴费方式" labelWidth="160">
										<el-select disabled v-model="BillNoList.payFeeList.firstal" slot="text" placeholder="请选择">
											<el-option label="银行转账" value="1"></el-option>
											<el-option label="其他" value="2"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="开户行名称：" labelWidth="160">
										<el-select disabled v-model="BillNoList.payFeeList.bankName" slot="text" placeholder="请选择">
											<el-option label="中国银行" value="1"></el-option>
											<el-option label="其他" value="2"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="账户名：" labelWidth="160">
										<el-input disabled slot="text" v-model="BillNoList.payFeeList.accountNameFirstal"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="账号：" labelWidth="160">
										<el-input disabled slot="text" v-model="BillNoList.payFeeList.accountFirstal"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
				<!-- 缴费明细 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>缴费明细
					</span>
					<div class="ri-content" slot="content">
						<el-table border :data="BillNoList.payFeeDetailList" style="width: 100%" stripe>
							<el-table-column prop="riskCode" label="险种代码"></el-table-column>
							<el-table-column prop="riskName" label="险种名称"></el-table-column>
							<el-table-column prop="paidPremium" label="实收保费"></el-table-column>
							<el-table-column prop="payDate" label="实收日期"></el-table-column>
							<el-table-column prop="riskStatus" label="险种状态">
								<template slot-scope="scope">
									{{ scope.row.riskStatus === '0' ?  '失效': '' }}
									{{ scope.row.riskStatus === '1' ?  '未承保': '' }}
									{{ scope.row.riskStatus === '2' ?  '有效': '' }}
									{{ scope.row.riskStatus === '3' ?  '拒保': '' }}
									{{ scope.row.riskStatus === '4' ?  '退保': '' }}
									{{ scope.row.riskStatus === '5' ?  '犹退': '' }}
									{{ scope.row.riskStatus === '6' ?  '失效': '' }}
									{{ scope.row.riskStatus === '7' ?  '永久失效': '' }}
									{{ scope.row.riskStatus === '8' ?  '理赔中': '' }}
									{{ scope.row.riskStatus === '9' ?  '理赔终止': '' }}
									{{ scope.row.riskStatus === '10' ?  '减额交清': '' }}
									{{ scope.row.riskStatus === '11' ?  '交清': '' }}
									{{ scope.row.riskStatus === '112' ?  '冻结': '' }}
									{{ scope.row.riskStatus === '13' ?  '到期终止': '' }}
									{{ scope.row.riskStatus === '14' ?  '死亡理赔': '' }}
								</template>
							</el-table-column>
						</el-table>
						<el-row style="margin-top: 20px;">
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="应缴保费总计：" labelWidth="160">
										<el-input disabled slot="text" v-model="BillNoList.payFeeList.sumPremium"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="实收保费总计" labelWidth="160">
										<el-input disabled slot="text" v-model="BillNoList.payFeeList.paidPremium"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="缴费状态：" labelWidth="160">
										<el-select disabled v-model="BillNoList.payFeeList.paymentFlag" slot="text" placeholder="请选择">
											<el-option label="已缴费" value="1"></el-option>
											<el-option label="未缴费" value="2"></el-option>
											<el-option label="保费豁免" value="3"></el-option>
											<el-option label="缴费回退" value="4"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
			</el-form>
		</el-dialog>

		<!-- 业务员弹框 -->
		<el-dialog :append-to-body='true' center width='80%' title="业务员详细信息" :visible.sync="isBisMan">
			<el-form class="mesg_form">
				<!-- 基本信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>业务员详细信息
					</span>
					<div class="ri-content" slot="content">
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="人员属性：" labelWidth="200">
										<el-input slot="text" :disabled="true" value="业务员"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="人员代码：" labelWidth="200">
										<el-input slot="text" :disabled="true" v-model="agentList.prpSagent.agentCode"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="人员姓名：" labelWidth="200">
										<el-input slot="text" :disabled="true" v-model="agentList.prpSagent.agentName"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="证件类型：" labelWidth="200">
										<el-select slot="text" disabled v-model="agentList.prpSagent.identifyType">
											<el-option label="身份证" value="1"></el-option>
											<el-option label="户口本" value="2"></el-option>
											<el-option label="军官证" value="3"></el-option>
											<el-option label="驾驶证" value="4"></el-option>
											<el-option label="护照" value="5"></el-option>
											<el-option label="港澳居民来往大陆通行证" value="6"></el-option>
											<el-option label="台湾居民来往大陆通行证" value="7"></el-option>
											<el-option label="其他" value="8"></el-option>
											<el-option label="出生医学证明" value="9"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="证件号码：" labelWidth="200">
										<el-input slot="text" :disabled="true" v-model="agentList.prpSagent.identifyNumber"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="教育水平：" labelWidth="200">
										<el-select slot="text" disabled v-model="BillNoList.policyHolder.educationCode">
											<el-option label="小学" value="1"></el-option>
											<el-option label="初中" value="2"></el-option>
											<el-option label="高中" value="3"></el-option>
											<el-option label="大专" value="4"></el-option>
											<el-option label="本科" value="5"></el-option>
											<el-option label="硕士" value="6"></el-option>
											<el-option label="博士" value="7"></el-option>
											<el-option label="其他" value="8"></el-option>
											<el-option label="中专" value="9"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="性别：" labelWidth="200">
										<el-select slot="text" disabled v-model="agentList.prpSagent.sex">
											<el-option label="男" value="0"></el-option>
											<el-option label="女" value="1"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="出生日期：" labelWidth="200">
										<el-date-picker disabled v-model="agentList.prpSagent.birthday" slot="text" type="date" placeholder="选择日期"></el-date-picker>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="归属机构：" labelWidth="200">
										<el-input slot="text" :disabled='true' v-model="agentList.prpSagent.comName"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
				<!-- 银行信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>银行信息
					</span>
					<div class="ri-content" slot="content">
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="开户银行：" labelWidth="200">
										<el-input slot="text" :disabled="true" v-model="agentList.bankInfo.bankname"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="银行账号：" labelWidth="200">
										<el-input slot="text" :disabled="true" v-model="agentList.prpSagent.account"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="开户名：" labelWidth="200">
										<el-input slot="text" :disabled="true" v-model="agentList.prpSagent.accountName"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="开户地址：" labelWidth="200">
										<el-input slot="text" :disabled="true" v-model="agentList.bankInfo.areaname"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<!-- <el-row >
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text label="银行名称：" labelWidth="200" >
                    <el-input slot="text" :disabled="true" v-model="agentList.bankInfo.bankname" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="区域名称：" labelWidth="200" >
                    <el-input slot="text" :disabled="true" v-model="agentList.bankInfo.areaname" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row> -->
					</div>
				</ui-line-tittle>
				<!-- 业务信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>业务信息
					</span>
					<div class="ri-content" slot="content">
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="渠道：" labelWidth="200">
										<el-select slot="text" disabled v-model="agentList.prpSagent.agentType">
											<el-option label="银保人员" value="1"></el-option>
											<el-option label="同道人团" value="2"></el-option>
											<el-option label="财富人员" value="3"></el-option>
											<el-option label="线下代理人" value="4"></el-option>
											<el-option label="创新渠道人员" value="5"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="职级：" labelWidth="200">
										<el-input slot="text" :disabled='true' v-model="agentList.agentGrode"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="增员人：" labelWidth="200">
										<el-input slot="text" :disabled='true' v-model="agentList.prpSagent.instructCode"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="上级领导：" labelWidth="200">
										<el-input slot="text" :disabled='true' v-model="agentList.prpSagent.higherName"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="类型：" labelWidth="200">
										<el-select slot="text" disabled v-model="agentList.prpSagent.jobType">
											<el-option
                        label="全部"
                        value="-1">
                      </el-option>
                      <el-option
                        label="合同制"
                        value="1">
                      </el-option>
                      <el-option
                        label="代理制"
                        value="3">
                      </el-option>
                      <el-option
                        label="出单工号"
                        value="2">
                      </el-option>
                      <el-option
                        label="劳务派遣"
                        value="4">
                      </el-option>
                      <el-option
                        label="内勤合同制"
                        value="5">
                      </el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="入职日期：" labelWidth="200">
										<el-date-picker disabled v-model="agentList.prpSagent.partInTime" slot="text" type="date"></el-date-picker>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="是否离职：" labelWidth="200">
										<el-select slot="text" disabled v-model="agentList.prpSagent.validStatus">
											<el-option label="是" value="0"></el-option>
											<el-option label="否" value="1"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="执业证号：" labelWidth="200">
										<el-input slot="text" :disabled='true' v-model="agentList.prpSagent.zhanYeCardNum"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="是否免税：" labelWidth="200">
										<el-select slot="text" disabled v-model="agentList.prpSagent.freeTax" placeholder="请选择">
											<el-option label="是" value="0"></el-option>
											<el-option label="否" value="1"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="基本薪：" labelWidth="200">
										<el-input slot="text" :disabled="true" v-model="agentList.prpSagent.baseSalary"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="经代公司简介：" labelWidth="200">
										<el-input slot="text" :disabled="true" v-model="agentList.prpSagent.remark1"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="备注：" labelWidth="200">
										<el-input slot="text" :disabled="true" v-model="agentList.prpSagent.remark2"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
				<!-- 审核历史 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>审核历史
					</span>
					<div class="ri-content" slot="content">
						<el-table ref="multipleTable" :data="resultTableData" tooltip-effect="dark" style="width: 100%;" stripe>
							<el-table-column prop="verifyStatus" label="审核状态"></el-table-column>
							<el-table-column prop="reviews" label="评语"></el-table-column>
							<el-table-column prop="updaterCode" label="操作员"></el-table-column>
							<el-table-column prop="updateTime" label="操作时间"></el-table-column>
						</el-table>
					</div>
				</ui-line-tittle>
			</el-form>
		</el-dialog>
		<!-- 投保人弹框 -->

		<el-dialog :append-to-body='true' center width='75%' title="投保人详细信息" :visible.sync="isIns">
			<el-form class="mesg_form">
				<!-- 基本信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>投保人信息
					</span>
					<div class="ri-content" slot="content">
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保人代码：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.insureNo"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保人名称：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.insureName"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保人地址：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.insureAddress"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保人电话：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.insureAddress"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="性别：" labelWidth="160">
										<el-select slot="text" disabled v-model="applicantList.sexType">
											<el-option label="男" value="0"></el-option>
											<el-option label="女" value="1"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="出生日期：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.birthDate"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="婚姻状况：" labelWidth="160">
										<el-select slot="text" disabled v-model="applicantList.marriage">
											<el-option label="已婚" value="1"></el-option>
											<el-option label="未婚" value="2"></el-option>
											<el-option label="不明" value="3"></el-option>
											<el-option label="离异" value="4"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="学历：" labelWidth="160">
										<el-select slot="text" disabled v-model="applicantList.educationCode">
											<el-option label="小学" value="1"></el-option>
											<el-option label="初中" value="2"></el-option>
											<el-option label="高中" value="3"></el-option>
											<el-option label="大专" value="4"></el-option>
											<el-option label="本科" value="5"></el-option>
											<el-option label="硕士" value="6"></el-option>
											<el-option label="博士" value="7"></el-option>
											<el-option label="其他" value="8"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="证件类型：" labelWidth="160">
										<el-select slot="text" disabled v-model="applicantList.identifyType">
											<el-option label="身份证" value="1"></el-option>
											<el-option label="户口本" value="2"></el-option>
											<el-option label="军官证" value="3"></el-option>
											<el-option label="驾驶证" value="4"></el-option>
											<el-option label="护照" value="5"></el-option>
											<el-option label="港澳居民来往大陆通行证" value="6"></el-option>
											<el-option label="台湾居民来往大陆通行证" value="7"></el-option>
											<el-option label="其他" value="8"></el-option>
											<el-option label="出生医学证明" value="9"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="证件号码：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.identifyNumber"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="证件有效期：" labelWidth="160">
                    <el-input v-if="applicantList.longFlag === 0||!(applicantList.longFlag)" slot="text" :disabled='true' v-model="applicantList.identifyValiddate"></el-input>
                    <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="移动电话：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.mobilePhone"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="固定电话：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.insureTel"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="邮政编码：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.postNo"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="与被保险人关系：" labelWidth="160">
										<el-select slot="text" disabled v-model="applicantList.insuredrType">
											<el-option label="本人" value="1"></el-option>
											<el-option label="配偶" value="2"></el-option>
											<el-option label="子女" value="3"></el-option>
											<el-option label="父母" value="4"></el-option>
											<el-option label="其他" value="5"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="国籍：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.country"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="工作单位：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.workingUnit"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="职业：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.job"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="E-mail：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.e_mail"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="微信号：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="applicantList.weixin"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
			</el-form>
		</el-dialog>

		<!-- 被保险人弹框 -->

		<el-dialog   :append-to-body='true' center width='75%' title="被保险人详细信息" :visible.sync="isInsured">
			<el-form class="mesg_form">
				<!-- 基本信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>被保险人信息
					</span>
					<div class="ri-content" slot="content">
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="被保险人代码：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.insureNoD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="被保险人名称：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.insureNameD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="被保险人地址：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.insureAddressD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="被保险人电话：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.insureAddressD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="性别：" labelWidth="160">
										<el-select slot="text" disabled v-model="insuredMesg.sexTypeD" placeholder="请选择">
											<el-option label="男" value="0"></el-option>
											<el-option label="女" value="1"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="出生日期：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.birthDateD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>

						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="婚姻状况：" labelWidth="160">
										<el-select slot="text" disabled v-model="insuredMesg.marriageD" placeholder="请选择">
											<el-option label="已婚" value="1"></el-option>
											<el-option label="未婚" value="2"></el-option>
											<el-option label="不明" value="3"></el-option>
											<el-option label="离异" value="4"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="学历：" labelWidth="160">
										<el-select slot="text" disabled v-model="insuredMesg.educationCodeD" placeholder="请选择">
											<el-option label="小学" value="1"></el-option>
											<el-option label="初中" value="2"></el-option>
											<el-option label="高中" value="3"></el-option>
											<el-option label="大专" value="4"></el-option>
											<el-option label="本科" value="5"></el-option>
											<el-option label="硕士" value="6"></el-option>
											<el-option label="博士" value="7"></el-option>
											<el-option label="其他" value="8"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="证件类型：" labelWidth="160">
										<el-select slot="text" disabled v-model="insuredMesg.identifyTypeD" placeholder="请选择">
											<el-option label="身份证" value="1"></el-option>
											<el-option label="户口本" value="2"></el-option>
											<el-option label="军官证" value="3"></el-option>
											<el-option label="驾驶证" value="4"></el-option>
											<el-option label="护照" value="5"></el-option>
											<el-option label="港澳居民来往大陆通行证" value="6"></el-option>
											<el-option label="台湾居民来往大陆通行证" value="7"></el-option>
											<el-option label="其他" value="8"></el-option>
											<el-option label="出生医学证明" value="9"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="证件号码：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.identifyNumberD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="证件有效期：" labelWidth="160">
                    <el-input v-if="insuredMesg.longFlagD === 0||!(insuredMesg.longFlagD)" slot="text" :disabled='true' v-model="insuredMesg.identifyValiddateD"></el-input>
                    <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="移动电话：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.mobilePhoneD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="固定电话：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.insureTelD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="邮政编码：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.postNoD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="国籍：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.countryD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="工作单位：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.workingUnitD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="职业：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.jobD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="E-mail：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.e_mailD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="微信号：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="insuredMesg.weixinD"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
			</el-form>
		</el-dialog>

		<!-- 续期弹框 -->

		<el-dialog :append-to-body='true' @close='closeModify' center width='70%' title="续期保单修改" :visible.sync="isContinueNo">
			<el-form class="mesg_form" :model="BillContinueList" ref="BillContinueList" :rules="ruleForm">
				<!-- 基本信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>基本信息
					</span>
					<div class="ri-content" slot="content">
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保单号：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillContinueList.baseMesg.proposalNo"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="保单号：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillContinueList.baseMesg.policyNo"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="保单状态：" labelWidth="160">
										<el-select slot="text" disabled v-model="BillContinueList.baseMesg.policyStatus" placeholder="请选择">
											<el-option label="未承保" value="1"></el-option>
											<el-option label="有效" value="2"></el-option>
											<el-option label="拒保" value="3"></el-option>
											<el-option label="退保" value="4"></el-option>
											<el-option label="犹退" value="5"></el-option>
											<el-option label="失效" value="6"></el-option>
											<el-option label="永久失效" value="7"></el-option>
											<el-option label="理赔中" value="8"></el-option>
											<el-option label="理赔终止" value="9"></el-option>
											<el-option label="减额交清" value="10"></el-option>
											<el-option label="交清" value="11"></el-option>
											<el-option label="冻结" value="12"></el-option>
											<el-option label="保单终止" value="13"></el-option>
											<el-option label="死亡理赔" value="14"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保日期：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillContinueList.baseMesg.proposalDate"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="承保日期：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillContinueList.baseMesg.acceptDate"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="生效日期：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillContinueList.baseMesg.effectDate"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="缴至日期：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillContinueList.baseMesg.jzDate"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="保单年度：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillContinueList.baseMesg.bdYear"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="归属保险公司代码：" labelWidth="160">
										<el-input slot="text" :disabled="true" v-model="BillContinueList.baseMesg.companyCode"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="归属保险公司名称：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillContinueList.baseMesg.companyName"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="归属保险公司机构代码：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillContinueList.baseMesg.companyComCode"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="归属保险公司机构名称：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillContinueList.baseMesg.companyComName"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="新/续保标记：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillContinueList.baseMesg.xqFlag"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="更新时间：" labelWidth="160">
										<el-date-picker :disabled='true' format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" v-model="BillContinueList.baseMesg.updateTime"
										 slot="text" type="date" placeholder="选择日期"></el-date-picker>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
				<!--投保人信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>投保人信息
					</span>
					<div class="ri-content" slot="content">
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保人代码：" labelWidth="160">
										<el-input slot="text" :disabled='true' v-model="BillContinueList.policyHolder.customerId"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="投保人名称：" labelWidth="160">
										<el-input slot="text" v-model="BillContinueList.policyHolder.customerName"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="证件类型：" labelWidth="160">
										<el-select slot="text" v-model="BillContinueList.policyHolder.idType" placeholder="请选择" @change="idTypeChange">
											<el-option label="身份证" value="1"></el-option>
											<el-option label="户口本" value="2"></el-option>
											<el-option label="军官证" value="3"></el-option>
											<el-option label="驾驶证" value="4"></el-option>
											<el-option label="护照" value="5"></el-option>
											<el-option label="港澳居民来往大陆通行证" value="6"></el-option>
											<el-option label="台湾居民来往大陆通行证" value="7"></el-option>
											<el-option label="其他" value="8"></el-option>
											<el-option label="出生医学证明" value="9"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item prop="policyHolder.idNo">
									<ui-label-text label="证件号码：" labelWidth="160" :required="true" >
										<el-input slot="text" v-model="BillContinueList.policyHolder.idNo"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item prop="policyHolder.homePhone">
									<ui-label-text label="固定电话：" labelWidth="160" :required="true">
										<el-input slot="text" v-model="BillContinueList.policyHolder.homePhone" placeholder="请至少填写一种联系方式"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item prop="policyHolder.phone">
									<ui-label-text label="移动电话：" labelWidth="160" :required="true">
										<el-input slot="text" v-model="BillContinueList.policyHolder.phone" maxlength="11" placeholder="请至少填写一种联系方式"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
				<!-- 业务员信息 -->
				<ui-line-tittle collapsible=true>
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>业务员信息
					</span>
					<div class="ri-content" slot="content">
						<el-row v-for="(item, index) in salesmanInfoList2" :key="index">
							<el-col :span="12" v-for="(i, idx) in item" :key="idx">
								<el-form-item>
									<ui-label-text :label="i.label+':'" labelWidth="160">
										<el-input slot="text" disabled="" v-model="BillContinueList.baseMesg[i.prop]"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
				<!-- 险种信息 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>险种信息
					</span>
					<div class="ri-content" slot="content">
						<el-table border :data="BillContinueList.insureTypeList" style="width: 100%" stripe>
							<el-table-column label="险种代码">
								<template slot-scope="scope">
									<el-input v-model="scope.row.riskCode" size='mini' slot="text" placeholder="双击选择" @dblclick.native="dbDialogPath({type: '0', index: scope.$index, listName: 'insureTypeList'})">></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="riskName" label="险种名称" width="200"></el-table-column>
							<el-table-column prop="mainFlag" label="主/附险标识">
								<template slot-scope="scope">
									<el-select :disabled='true' size='mini' v-model="scope.row.mainFlag" slot="text" placeholder="请选择">
										<el-option label="附加险" value="0"></el-option>
										<el-option label="主险" value="1"></el-option>
										<el-option label="主/附险" value="3"></el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="paymentperiod" label="缴费年期">
								<template slot-scope="scope">
									<el-input slot="text" size='mini' disabled v-model="scope.row.paymentperiod"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="payType" label="缴费频率">
								<template slot-scope="scope">
									<el-select size='mini' v-model="scope.row.payType" slot="text" placeholder="请选择">
										<el-option label="天缴" value="0"></el-option>
										<el-option label="月缴" value="1"></el-option>
										<el-option label="季缴" value="2"></el-option>
										<el-option label="年缴" value="3"></el-option>
                    <el-option label="趸缴" value="4"></el-option>
										<el-option label="半年缴" value="5"></el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="应缴保费">
								<template slot-scope="scope">
									<el-input @change="premiumChange" slot="text" size='mini' v-model="scope.row.premium" @blur="addFloat(scope.$index, 0, 0)"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button slot="text" type="danger" size='mini' @click="handleDelete(scope.$index, 'insureTypeList')">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-button type="primary" class="dis-bottom" size="mini" @click="onaddInsurInfo">添加</el-button>
					</div>
				</ui-line-tittle>
				<!-- 缴费明细 -->
				<ui-line-tittle :collapsible="true">
					<span slot="title">
						<i class="font_family icon-jy-menu-4"></i>缴费明细
					</span>
					<div class="ri-content" slot="content">
						<el-table stripe border :data="BillContinueList.payFeeDetailList" style="width: 100%" class="riskTable">
							<el-table-column prop="riskCode" label="险种代码">
								<template slot-scope="scope">
									<el-form-item :prop="'payFeeDetailList.' + scope.$index + '.riskCode'" :rules="riskRules.riskCode">
                    <ui-label-text :required="true" >
										    <el-input slot="text" size='mini' clearable v-model="scope.row.riskCode" placeholder="双击选择" @dblclick.native="dbDialogPath({type: '1', index: scope.$index, listName: 'payFeeDetailList'})"></el-input>
                    </ui-label-text>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column label="险种名称">
								<template slot-scope="scope">
									<el-form-item :prop="'payFeeDetailList.' + scope.$index + '.riskName'" :rules="riskRules.riskName">
                    <ui-label-text :required="true" >
										  <el-input slot="text" size="mini" clearable disabled v-model="scope.row.riskName"></el-input>
                    </ui-label-text>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column label="实收保费">
								<template slot-scope="scope">
									<el-form-item :prop="'payFeeDetailList.' + scope.$index + '.paidPremium'" :rules="riskRules.paidPremium">
                    <ui-label-text :required="true" >
										    <el-input slot="text" @change="paidPremiumChange" @blur="addFloat(scope.$index, 1, 0)" size='mini' clearable v-model="scope.row.paidPremium"></el-input>
                    </ui-label-text>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column prop="payDate" label="实收日期">
								<template slot-scope="scope">
                  <ui-label-text>
                    <el-date-picker slot="text" size='mini' v-model="scope.row.paidDate"  align="right" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </ui-label-text>
								</template>
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button type="danger"  @click="handleDelete(scope.$index, 'payFeeDetailList')">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-button type="primary" class="dis-bottom" size="mini" @click="onaddPayInfo">添加</el-button>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="应缴保费总计:" labelWidth="160">
										<el-input :disabled="true" slot="text" v-model="BillContinueList.payFeeList.sumPremium"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="实收保费总计:" labelWidth="160">
										<el-input :disabled="true" slot="text" v-model="BillContinueList.payFeeList.paidPremium"></el-input>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<ui-label-text label="缴费状态" labelWidth="160">
										<el-select :disabled='true' slot="text" v-model="BillContinueList.baseMesg.paymentFlag" placeholder="请选择">
											<el-option label="已缴费" value="1"></el-option>
											<el-option label="未缴费" value="2"></el-option>
											<el-option label="保费豁免" value="3"></el-option>
											<el-option label="缴费回退" value="4"></el-option>
										</el-select>
									</ui-label-text>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</ui-line-tittle>
				<el-form-item>
					<el-button class="dis-center" type="primary" size="mini" @click="submitForm">修改</el-button>
				</el-form-item>
			</el-form>
			<!-- db-dialog-select -->
			<el-dialog title="险种信息" append-to-body center :visible.sync="dbDialogVisible" width="70%">
				<div class="rate-table">
					<el-table :data="tableData" highlight-current-row @row-click="onselectColumn" style="width: 100%" stripe>
						<el-table-column v-for="(item, index) in dialogColumnList" :key="index" :label="item.label" :prop="item.prop">
						</el-table-column>
					</el-table>
					<el-pagination @size-change="dbhandleSizeChange" @current-change="dbhandleCurrentChange" :current-page="tablePage.currentPage"
					 :page-size="tablePage.size" :page-sizes="tablePage.sizes" layout="total, sizes, prev, pager, next, jumper" :total="tablePage.total">
					</el-pagination>
				</div>
			</el-dialog>
		</el-dialog>
	</div>
</template>
<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    const { emptyValidator, insurtypeaddPremiumValidator, insurtypeaddPremiumValidator2, noEmptyValidator, IdValidator, phoneNumberValidator, PhoneValidator, phoneValidator } = this.$store.getters.validators
    const idNumValidator = (rule, value, callback) => {
      var containSpecial = RegExp(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/)
      console.log(this.BillContinueList.policyHolder.idType)
      if (this.BillContinueList.policyHolder.idType === '1' || this.BillContinueList.policyHolder.idType === '2') {
        if (!containSpecial.test(value)) {
          callback(new Error('请输入正确的身份证号码'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const idValidatorNew = [
      {
        validator: idNumValidator, trigger: 'blur'
      }
    ]
    return {
      emptyValidator: emptyValidator,
      PhoneValidator: PhoneValidator,
      insurtypeaddPremiumValidator: insurtypeaddPremiumValidator,
      IdValidator: IdValidator,
      phoneNumberValidator: phoneNumberValidator,
      phoneValidator: phoneValidator,
      policyHolderRules: {
        homePhone: PhoneValidator
      },
      riskRules: {
        riskCode: emptyValidator,
        riskName: emptyValidator,
        paidPremium: insurtypeaddPremiumValidator2
      },
      ruleForm: {
        'policyHolder.homePhone': PhoneValidator,
        'policyHolder.phone': phoneNumberValidator,
        'policyHolder.idNo': idValidatorNew
      },
      allInput: false,
      noEmptyValidator: noEmptyValidator,
      searchData: {
        policyNo: '',
        insureNo: '',
        insureName: '',
        identifyNumber: '',
        insureNoD: '',
        insureNameD: '',
        identifyNumberD: ''
      }, // 查询条件
      searchResult: [], // 查询结果
      isShowTable: false, // 是否显示查询结果
      current: 1, // 当前页
      totalRecords: 0, // 总条数
      totalPages: 0, // 总页数
      pageSize: 5, // 每页显示条数
      isBillNo: false,
      BillNoList: { // 个保单详情
        baseMesg: {}, // 基本信息
        policyHolder: {}, // 投保人信息
        insuredList: [], // 被保险人
        dieBeniftList: [], // 身故受益人
        liveBeniftList: [], // 生存受益人
        insureTypeList: [], // 险种信息
        payFeeList: {}, // 缴费信息
        payFeeDetailList: [
          {
            riskCode: '',
            riskName: '',
            paidPremium: ''
          }
        ] // 缴费明细
      }, // 保单号信息
      isBisMan: false, // 是否显示业务员弹框
      agentList: {
        prpSagent: {}, // 基本信息
        bankInfo: {} // 银行信息
      },
      isIns: false, // 是否显示投保人信息
      applicantList: {}, // 投保人信息
      isInsured: false,
      insuredMesg: {}, // 被保险人信息
      isContinueNo: false, //     为了调试
      BillContinueList: { // 个保单详情
        baseMesg: {}, // 基本信息
        policyHolder: {
          homePhone: '',
          phone: '',
          idNo: ''
        }, // 投保人信息
        insuredList: [], // 被保险人
        insureTypeList: [
          {riskCode: '123', riskName: '达线', mainFlag: '3', paymentperiod: '160', payType: '0', premium: '500'},
          {riskCode: '123', riskName: '达线', mainFlag: '3', paymentperiod: '160', payType: '0'},
          {riskCode: '123', riskName: '达线', mainFlag: '3', paymentperiod: '160', payType: '0'}
        ], // 险种信息
        payFeeList: {}, // 缴费信息
        payFeeDetailList: [
          {riskCode: '123', riskName: '达线', paidPremium: '500', payDate: '20'}
        ], // 缴费明细
        agentList: {}
      }, // 保单号信息
      salesmanInfoList: [
        [{label: '原业务员代码', prop: 'handlerCode'}, {label: '原业务员名称', prop: 'handlerName'}],
        [{label: '原业务员状态', prop: 'agentStatus'}],
        [{label: '原归属机构/部门代码', prop: 'comCode'}, {label: '原归属机构/部门名称', prop: 'comName'}],
        [{label: '介绍人类型', prop: 'introduceType'}, {label: '介绍人代码', prop: 'introduceCode'}],
        [{label: '介绍人名称', prop: 'introduceName'}, {label: '联系人电话', prop: 'agentPhone'}],
        [{label: '新业务员代码', prop: 'agentCode2'}, {label: '新业务员名称', prop: 'agentName2'}],
        [{label: '新业务员状态', prop: 'agentStatus2'}, {label: '服务人员名称', prop: 'agentTypeName'}]
      ],
      salesmanInfoList2: [
        [{label: '原业务员代码', prop: 'agentCode'}, {label: '原业务员名称', prop: 'agentName'}],
        [{label: '原业务员状态', prop: 'agentStatus'}],
        [{label: '原归属机构/部门代码', prop: 'comCode'}, {label: '原归属机构/部门名称', prop: 'comName'}],
        [{label: '介绍人类型', prop: 'introduceType'}, {label: '介绍人代码', prop: 'introduceCode'}],
        [{label: '介绍人名称', prop: 'introduceName'}, {label: '联系人电话', prop: 'agentPhone'}],
        [{label: '新业务员代码', prop: 'agentCode2'}, {label: '新业务员名称', prop: 'agentName2'}],
        [{label: '新业务员状态', prop: 'agentStatus2'}, {label: '服务人员名称', prop: 'agentTypeName'}]
      ],
      // dbDialog
      dbDialogVisible: false,
      tableData: [],
      dialogColumnList: [
        {label: '险种代码', prop: 'riskcode'},
        {label: '险种名称', prop: 'riskname'}
      ],
      tablePage: {
        currentPage: 1,
        total: 20,
        size: 5,
        sizes: [5, 10, 20, 50]
      },
      resultTableData: [],
      dbPath: {
        type: '',
        index: ''
      },
      dbIndex: 0,
      listName: '',
      enumes: {
        agentStatus: {
          '0': '离职',
          '1': '在职'
        },
        introduceTypes: {
          '0': '0',
          '1': '1'
        }
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      // 初始化数据
      this.getDate()
    })
  },
  watch: {
  },
  methods: {
    // 加载中开始
    Loading () {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.6)'
      })
    },
    // 加载中结束
    closeLoading () {
      this.loading.close()
    },
    closeModify () {
      this.$refs['BillContinueList'].resetFields()
      this.isContinueNo = false
    },
    searchBill (page) { // 查询保单
      let lifePCMainCondition = {
        'policyNo': this.searchData.policyNo,
        'currentPage': page,
        'pageSize': this.pageSize
      }
      let lifePartyCondition = {
        'insureNo': this.searchData.insureNo,
        'insureName': this.searchData.insureName,
        'identifyNumber': this.searchData.identifyNumber
      }
      let lifePartyConditionD = {
        'insureNoD': this.searchData.insureNoD,
        'insureNameD': this.searchData.insureNameD,
        'identifyNumberD': this.searchData.identifyNumberD
      }
      let postData = {
        'lifePCMainCondition': lifePCMainCondition,
        'lifePartyCondition': lifePartyCondition,
        'lifePartyConditionD': lifePartyConditionD
      }
      this.Loading()
      this.searchBillList(postData).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.isShowTable = true
          resp.data.content.forEach((item, index) => {
            item.xqFlag2 = 1
          })
          console.log(resp.data.content)
          this.searchResult = resp.data.content
          this.totalRecords = resp.data.totalElements
          this.totalPages = resp.data.totalPages
        } else {
          this.open('error', resp.msg)
        }
      }).catch(() => {
        this.closeLoading()
      })
    },
    handleCurrentChange (val) { // 分页
      this.searchBill(val)
    },
    searchSizeChange (size) {
      this.pageSize = size
      this.searchBill(1)
    },
    idTypeChange (val) { // 证件类型改变
      this.BillContinueList.policyHolder.idNo = ''
    },
    detailPolicyNo (row) { // 保单号详情
      this.Loading()
      this.searchPolicyNoDetail({'policyNo': row.policyNo}).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.isBillNo = true
          this.BillNoList.baseMesg = resp.data.lifePCMainCondition // 基本信息
          this.BillNoList.baseMesg.agentStatus = this.enumes.agentStatus[this.BillNoList.baseMesg.agentStatus] // 枚举值转换
          this.BillNoList.baseMesg.agentStatus2 = this.enumes.agentStatus[this.BillNoList.baseMesg.agentStatus2] // 枚举值转换
          this.BillNoList.policyHolder = resp.data.lifePartyCondition // 投保人信息
          this.BillNoList.insuredList = resp.data.lifePartyConditionDList // 被保险人信息
          this.BillNoList.dieBeniftList = resp.data.lifePartyTConditionList // 身故受益人信息
          this.BillNoList.liveBeniftList = resp.data.lifePartyAConditionList // 生存收益人信息
          resp.data.lifeCItemKindConditionList.forEach((item, index) => {
            if (item.tbrFreeFlag === '0') {
              item.tbrFreeFlag = false
            } else {
              item.tbrFreeFlag = true
            }
            if (item.bbrFreeFlag === '0') {
              item.bbrFreeFlag = false
            } else {
              item.bbrFreeFlag = true
            }
            if (item.lifeFlag === 0) {
              item.lifeFlag = false
            } else {
              item.lifeFlag = true
            }
          })
          this.BillNoList.insureTypeList = resp.data.lifeCItemKindConditionList // 险种信息
          this.BillNoList.payFeeList = resp.data.lifeFeeCondition // 缴费信息
          if (this.BillNoList.payFeeList === null) {
            this.BillNoList.payFeeList = {}
          }
          this.BillNoList.payFeeDetailList = resp.data.lifeChargeConditionList // 缴费明细
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    detailAgentNo (row) { // 业务员详情
      console.log(row.handlerCode)
      this.Loading()
      this.searchAgentDetail({'agentCode': row.handlerCode}).then(resp => {
        this.closeLoading()
        if (resp.code === '000000' || resp.status === '0') {
          console.log(resp)
          this.isBisMan = true
          this.agentList.prpSagent = resp.data.prpSagent
          let settlementFlag = resp.data.prpSagent.settlementFlag
          if (settlementFlag === '1') {
            settlementFlag = '基本法'
          } else if (settlementFlag === '2') {
            settlementFlag = '就高保低'
          } else if (settlementFlag === '3') {
            settlementFlag = '包干'
          } else {
            settlementFlag = ''
          }
          this.agentList.prpSagent.settlementFlag = settlementFlag
          this.agentList.prpSagent.freeTax = this.agentList.prpSagent.freeTax.toString()
          this.agentList.bankInfo = resp.data.bankInfo
          this.agentList.agentGrode = resp.data.agentGrode
          this.resultTableData = resp.data.agentHisVos
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    detailApplicant (row) { // 投保人详情
      console.log(row.policyNo)
      this.Loading()
      this.searchInsureDetail({'policyNo': row.policyNo}).then(resp => {
        this.closeLoading()
        if (resp.code === '000000' || resp.status === '0') {
          this.isIns = true
          this.applicantList = resp.data
          // this.agentList.bankInfo = resp.data.bankInfo
          // this.agentList.agentGrode = resp.data.agentGrode
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    detailInsured (row) { // 被投保人
      this.Loading()
      this.searchInsuredDetail({'policyNo': row.policyNo}).then(resp => {
        this.closeLoading()
        console.log(resp)
        if (resp.code === '000000' || resp.status === '0') {
          this.isInsured = true
          this.insuredMesg = resp.data
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    detailXq (row) { // 续期保单详情
      console.log(row)
      this.checkXqDetail({'policyNo': row.policyNo, 'xqFlag2': row.xqFlag2}).then(resp => {
        if (resp.code === '000000' || resp.status === '0') {
          this.Loading()
          this.searchXqDetail({'policyNo': row.policyNo, 'xqFlag2': row.xqFlag2}).then(resp => {
            this.closeLoading()
            if (resp.code === '000000' || resp.status === '0') {
              this.isContinueNo = true
              this.BillContinueList.baseMesg = resp.data.lifeRenewalPolicyInfoVo // 基本信息
              this.BillContinueList.baseMesg.agentStatus = this.enumes.agentStatus[this.BillContinueList.baseMesg.agentStatus] // 枚举值转换
              this.BillContinueList.baseMesg.agentStatus2 = this.enumes.agentStatus[this.BillContinueList.baseMesg.agentStatus2] // 枚举值转换
              this.BillContinueList.baseMesg.introduceType = this.enumes.introduceTypes[this.BillContinueList.baseMesg.introduceType]
              this.BillContinueList.policyHolder = resp.data.lifeRenewalPartInfoVo // 投保人信息
              this.BillContinueList.agentList = resp.data.lifeRenewalPolicyInfoVo   // 业务员信息
              this.BillContinueList.insureTypeList = resp.data.lifeRenewalRiskInfoVoList // 险种信息
              this.BillContinueList.payFeeList = resp.data.lifeRenewalPolicyInfoVo
              this.BillContinueList.payFeeDetailList = resp.data.lifeRenewalChargeVoList // 缴费明细
            } else {
              this.open('error', resp.msg)
            }
            this.getDate()
          })
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    open (types, mesg) { // 提示
      this.$message({
        message: mesg,
        type: types
      })
    },
    handleDelete (index, e) {
      console.log(index)
      this.BillContinueList[e].splice(index, 1)
      console.log(this.BillContinueList.insureTypeList)
      if (e === 'payFeeDetailList') {
        this.paidPremiumChange()
      } else {
        this.premiumChange()
      }
    },
    onaddInsurInfo () {
      let obj = {riskCode: '', riskName: '', mainFlag: '', paymentperiod: '', payType: '', premium: ''}
      this.BillContinueList.insureTypeList.push(obj)
      console.log(this.BillContinueList.insureTypeList)
    },
    onaddPayInfo () {
      let obj = {riskCode: '', riskName: '', paidPremium: '', payDate: ''}
      this.BillContinueList.payFeeDetailList.push(obj)
      console.log(this.BillContinueList.payFeeDetailList)
    },
    dbDialog (e) {
      let a = Object.keys(e)
      console.log(a)
    },
    onselectColumn (row) {
      let list = this.BillContinueList.insureTypeList
      let listTwo = this.BillContinueList.payFeeDetailList
      let index = this.dbPath.index
      console.log(row)
      if (this.dbPath.type === 'insureTypeList') {
        list[index].riskCode = row.riskcode
        list[index].riskName = row.riskname
        list[index].mainFlag = row.mainorextrflag
        list[index].paymentperiod = row.paymentperiod
        list[index].payType = row.payway
      } else {
        listTwo[index].riskCode = row.riskcode
        listTwo[index].riskName = row.riskname
        listTwo[index]['paymentperiod'] = row.paymentperiod
      }
      this.dbDialogVisible = false
      this.tableData = ''
    },
    dbhandleCurrentChange (val) {
      this.tablePage.currentPage = val
      this.dbDialogPath()
    },
    dbhandleSizeChange (val) {
      this.tablePage.size = val
      this.dbDialogPath()
    },
    dbDialogPath (e) {
      if (e !== undefined) {
        this.dbPath.index = e.index
        this.dbPath.type = e.listName
        this.tablePage.currentPage = 1
        this.tablePage.size = 5
      }
      let _data = {
        currentPage: this.tablePage.currentPage,
        insurerCode: this.BillContinueList.baseMesg.companyCode,
        pageSize: this.tablePage.size,
        riskCode: this.BillContinueList[this.dbPath.type][this.dbPath.index].riskCode
      }
      this.riskcodeBill(_data).then(resp => {
        if (resp.code === '000000') {
          this.dbDialogVisible = true
          this.tableData = resp.data.data
          // this.tablePage.total = resp.data.totalPages
          this.tablePage.total = resp.data.totalRecords
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    submitForm () {
      this.$refs['BillContinueList'].validate((valid) => {
        if (valid) {
          // let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
          // if (this.BillContinueList.policyHolder.idType === '1' || this.BillContinueList.policyHolder.idType === '2') {
          //   if (!regIdCard.test(this.BillContinueList.policyHolder.idNo) || this.BillContinueList.policyHolder.idNo === '') {
          //     this.open('error', '投保人身份证号格式错误！')
          //     return false
          //   }
          // }
          if (this.BillContinueList.policyHolder.homePhone === '' && this.BillContinueList.policyHolder.phone === '') {
            this.open('error', '请至少填写一种联系方式！')
            return false
          }
          // let containSpecialPhone = /^[1][3,4,5,7,8][0-9]{9}$/
          // console.log(this.BillContinueList.policyHolder.phone)
          // if (!containSpecialPhone.test(this.BillContinueList.policyHolder.phone) || this.BillContinueList.policyHolder.phone === '') {
          //   this.open('error', '手机号格式不正确！')
          //   return false
          // }
          this.getModBillDetail()
        } else {
          console.log('error submit!!')
          this.$message.error('请检查必填项是否填写完整且正确！')
          return false
        }
      })
    },
    getModBillDetail () {
      let lifeRenewalPolicyInfoVo = {
        proposalNo: this.BillContinueList.baseMesg.proposalNo,
        policyNo: this.BillContinueList.baseMesg.policyNo,
        xqFlag: this.BillContinueList.baseMesg.xqFlag,
        sumPremium: this.BillContinueList.baseMesg.sumPremium,
        paidPremium: this.BillContinueList.baseMesg.paidPremium
      }
      let lifeRenewalPartyInfoVo = {
        customerName: this.BillContinueList.policyHolder.customerName,
        idType: this.BillContinueList.policyHolder.idType,
        idNo: this.BillContinueList.policyHolder.idNo,
        homePhone: this.BillContinueList.policyHolder.homePhone,
        phone: this.BillContinueList.policyHolder.phone
      }
      let lifeRenewalRiskInfoListVo = []
      for (var i = 0; i < this.BillContinueList.insureTypeList.length; i++) {
        let info = {
          riskCode: this.BillContinueList.insureTypeList[i].riskCode,
          riskName: this.BillContinueList.insureTypeList[i].riskName,
          mainFlag: this.BillContinueList.insureTypeList[i].mainFlag,
          paymentperiod: this.BillContinueList.insureTypeList[i].paymentperiod,
          payType: this.BillContinueList.insureTypeList[i].payType,
          premium: this.BillContinueList.insureTypeList[i].premium
        }
        lifeRenewalRiskInfoListVo.push(info)
      }
      let lifeRenewalPolicyChargeListVo = []
      for (var j = 0; j < this.BillContinueList.payFeeDetailList.length; j++) {
        let info = {
          riskCode: this.BillContinueList.payFeeDetailList[j].riskCode,
          riskName: this.BillContinueList.payFeeDetailList[j].riskName,
          paidPremium: this.BillContinueList.payFeeDetailList[j].paidPremium,
          paidDate: this.BillContinueList.payFeeDetailList[j].paidDate,
          paymentperiod: this.BillContinueList.payFeeDetailList[j].paymentperiod
        }
        lifeRenewalPolicyChargeListVo.push(info)
      }
      let modInfo = {
        lifeRenewalPolicyInfoVo,
        lifeRenewalPartyInfoVo,
        lifeRenewalRiskInfoListVo,
        lifeRenewalPolicyChargeListVo
      }
      console.log(modInfo)
      this.Loading()
      this.modBillDetail(modInfo).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.open('success', '修改成功')
          this.isContinueNo = false
        } else {
          this.open('error', resp.msg)
        }
      })
      // this.isContinueNo = true
      // this.BillContinueList.baseMesg = resp.data.lifeRenewalPolicyInfoVo // 基本信息
      // this.BillContinueList.policyHolder = resp.data.lifeRenewalPartInfoVo // 投保人信息
      // this.BillContinueList.insureTypeList = resp.data.lifeRenewalRiskInfoVoList // 险种信息
      // this.BillContinueList.payFeeDetailList = resp.data.lifeRenewalChargeVoList // 缴费明细
    },
    paidPremiumChange () {
      let count = 0
      this.BillContinueList.payFeeDetailList.forEach(function (value, index, array) {
        // if (value.paidPremium === '' || value == null) {
        //   value.paidPremium = 0
        // }
        if (value.paidPremium !== '' && value.paidPremium !== null) {
          count += parseFloat(value.paidPremium)
        }
      })
      this.BillContinueList.payFeeList.paidPremium = count
    },
    // 时间处理
    getDate () {
      let timestamp = new Date().getTime()
      this.BillContinueList.baseMesg.updateTime = timestamp
    },
    premiumChange () {
      let count = 0
      this.BillContinueList.insureTypeList.forEach(function (value, index, array) {
        if (value.premium === '') {
          value.premium = 0
        }
        count += parseFloat(value.premium)
      })
      this.BillContinueList.payFeeList.sumPremium = count
    },
    toDecimal (x) { // 补全小数点
      let f = parseFloat(x)
      if (isNaN(f)) {
        return ''
      }
      f = Math.round(x * 100) / 100
      let s = f.toString()
      let rs = s.indexOf('.')
      if (rs < 0) {
        rs = s.length
        s += '.'
      }
      while (s.length <= rs + 2) {
        s += '0'
      }
      return s
    },
    addFloat (index, tag, type) {
      // tag 0 险种信息 1缴费信息
      // type 0 应缴保费/实收保费 1 保险金额 2分数 3 加费金额
      if (tag === 0) {
        if (type === 0) {
          this.BillContinueList.insureTypeList[index].premium = this.toDecimal(this.BillContinueList.insureTypeList[index].premium)
        }
      } else {
        if (tag === 1) {
          if (type === 0) {
            this.BillContinueList.payFeeDetailList[index].paidPremium = this.toDecimal(this.BillContinueList.payFeeDetailList[index].paidPremium)
          }
        }
      }
    },
    ...mapActions([
      'searchBillList',
      'searchPolicyNoDetail',
      'searchAgentDetail',
      'searchInsureDetail',
      'searchInsuredDetail',
      'searchXqDetail',
      'riskcodeBill',
      'checkXqDetail',
      'modBillDetail'
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

<style lang="scss">
	// #billSearch{
	//   .el-form-item__error{
	//     display: none
	//   }
	//   .el-form-item{
	//     margin: 0;
	//   }
	// }
</style>


<style lang="scss" scoped type="text/css">
	#billSearch {
		padding: 0px 30px 30px 30px;
	}

	.manage_form {
		margin-top: 20px;
	}

	.ri-line {
		margin-bottom: 10px;
	}

	.splice-line {
		border-bottom: 1px solid #e4e7ed;
		margin-bottom: 10px;
	}

	.splice-line:last-child {
		border-bottom: 0;
	}
</style>
<style>
	.btn-container {
		text-align: center;
		margin: 30px 0;
	}

	.pagination {
		text-align: right;
		margin: 20px auto;
	}

	.el-input__icon {
		line-height: inherit;
	}

	.mesg_form .required:before {
		font-size: 14px !important;
		top: 3px !important;
	}

	.el-table__body .el-button {
		line-height: 30px;
		height: 30px;
		width: 50px;
		font-size: 13px;
		padding: 0;
	}

	.dis-bottom {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	a {
		text-decoration: none;
	}

  #billSearch .mesg_form .el-form-item__error {
		left: 170px;
	}

	.dis-center {
		display: block;
		margin: 0 auto;
	}

  .riskTable .el-select { width: 90%; }
  .riskTable .label-text .el-input { width: 90%;  }
  #billSearch .riskTable .el-form-item__error { left: 0;}
</style>
