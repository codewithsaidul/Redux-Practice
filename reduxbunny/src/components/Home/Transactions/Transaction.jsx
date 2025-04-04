const Transaction = () => {
  return (
    <li class="transaction income">
      <p>Earned this month</p>
      <div class="right">
        <p>৳ 100</p>
        <button class="link">
          <img class="icon" src="./images/edit.svg" alt="edit" />
        </button>
        <button class="link">
          <img class="icon" src="./images/delete.svg" alt="delete" />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
