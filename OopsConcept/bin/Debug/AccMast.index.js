$(document).ready(function () {
    InitList();
    DropDownAccountGroup();
    DropDownAccountType();
});

function DropDownAccountGroup() {
    ProbusFunction.ProbusSelect({
        Token: $('input[name="__RequestVerificationToken"]', $('#frmAccMastList')).val(),
        ListURL: IndexJs.DropDown.AccountGroup.ListUrl,
        SelectId: 'ACGrpCode',
        Value: '',
        AllowClear: true,
        OnChangeCallback: function () {
            InitList();
        }
    });
}

function DropDownAccountType() {
    ProbusFunction.ProbusSelect({
        Token: $('input[name="__RequestVerificationToken"]', $('#frmAccMastList')).val(),
        ListURL: IndexJs.DropDown.AccountType.ListUrl,
        SelectId: 'ACTypCode',
        Value: '',
        AllowClear: true,
        OnChangeCallback: function () {
            InitList();
        }
    });
}

function InitList() {
    ProbusFunction.ProbusTable({
        DataTable: 'dtAccMast',
        Pagination: 'compact-pagination',
        StartIndex: 0,
        PageSize: 0,
        Paging: false,
        Token: $('input[name="__RequestVerificationToken"]', $('#frmAccMastList')).val(),
        ParaArrayDetail: [{
            ParaName: 'ACGrpCode',
            ParaValue: $('#ACGrpCode').val()
        },
        {
            ParaName: 'ACTypCode',
            ParaValue: $('#ACTypCode').val()
        }],
        ListURL: IndexJs.ListUrl,
        ActPer: IndexJs.ActPer,
        ActionMenu: [{
            ActionUrl: IndexJs.UpdateUrl,
            ParaArray: [{
                EditIndex: 'ACCode',
                EditId: 'ACCode'
            }],
            Title: 'Edit'
        },
        {
            Title: 'Remove',
            OnClick: "ProbusFunction.RemoveDataFromGrid(this)",
            DataExtParam: [
                { ConfrimMessage: 'You want to remove?' },
                { GridReloadFn: 'InitList' },
                { Index: 'ACCode', Type: 'string' },
                { Key: "ajax-url", Value: IndexJs.DeleteUrl },
                {
                    Key: "ajax-data",
                    Value: [
                        { Key: "ACCode", Value: "ACCode", Source: "data" },
                        { Key: "Token", Value: $('input[name="__RequestVerificationToken"]', $('#frmAccMastList')).val(), Source: "static" }
                    ]
                }
            ]
        }],
        colModel: IndexJs.ColModel
    });
}